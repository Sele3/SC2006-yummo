from Yummo.utilityfunctions import AuthenticatedCustomerViewClass
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from ..utils.post_utils import validate_post_in_group
from ..utils.comment_utils import validate_comment_in_post, validate_comment_by_customer
from ..models import YummoGroup, Post, Comment
from ..serializers import CommentSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class SingleCommentsView(AuthenticatedCustomerViewClass):
    def get_objects(self, grpID, postID, commID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        post = get_object_or_404(Post, post_id=postID)
        comment = get_object_or_404(Comment, comment_id=commID)
        return group, post, comment


    @swagger_auto_schema(
        operation_description="Get info of a `Comment` from the `Post` in the `YummoGroup`.",
        tags=['comments'], 
        responses={200: CommentSerializer, 403: "Forbidden"})
    def get(self, request, grpID, postID, commID):
        group, post, comment = self.get_objects(grpID, postID, commID)

        validate_post_in_group(group, post)
        validate_comment_in_post(comment, post)

        serialized_comment = CommentSerializer(comment)
        return Response(serialized_comment.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_description="Update a `Comment` from the `Post` in the `YummoGroup`.",
        tags=['comments'], 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, 
            properties={'content': openapi.Schema(type=openapi.TYPE_STRING)}),
        responses={201: CommentSerializer, 400: "Bad Request", 403: "Forbidden"})
    def put(self, request, grpID, postID, commID):
        group, post, comment = self.get_objects(grpID, postID, commID)

        validate_post_in_group(group, post)
        validate_comment_in_post(comment, post)
        validate_comment_by_customer(comment, request.user)

        serialized_comment = CommentSerializer(comment, data=request.data, partial=True)
        if not serialized_comment.is_valid():
            return Response(serialized_comment.errors, status=status.HTTP_400_BAD_REQUEST)
        serialized_comment.save()
        return Response(serialized_comment.data, status=status.HTTP_201_CREATED)
        
    @swagger_auto_schema(
        operation_description="Delete a `Comment` from the `Post` in the `YummoGroup`.",
        tags=['comments'], 
        responses={200: "OK", 400: "Bad Request", 403: "Forbidden"})
    def delete(self, request, grpID, postID, commID):
        group, post, comment = self.get_objects(grpID, postID, commID)

        validate_post_in_group(group, post)
        validate_comment_in_post(comment, post)
        validate_comment_by_customer(comment, request.user)

        comment.delete()
        return Response({"message": "The comment has been deleted."}, status=status.HTTP_200_OK)
    