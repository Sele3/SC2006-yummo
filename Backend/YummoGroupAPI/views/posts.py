from Yummo.utilityfunctions import AuthenticatedCustomerViewClass
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from ..serializers import *
from ..utils.group_utils import validate_customer_in_group
from ..utils.post_utils import validate_post_in_group, validate_post_by_customer
from drf_yasg.utils import swagger_auto_schema


class YummoGroupPostsView(AuthenticatedCustomerViewClass):

    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(
        operation_description="Get a list of all `Post` in the `YummoGroup`.",
        tags=['posts'], 
        responses={200: PostSerializer(many=True), 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def get(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        validate_customer_in_group(group, customer)
        
        serialized_posts = PostSerializer(group.posts, many=True)
        return Response(serialized_posts.data, status=status.HTTP_200_OK)
        
    @swagger_auto_schema(
        operation_description="Create a new `Post` in the `YummoGroup`.",
        tags=['posts'], 
        request_body=PostFormSerializer, responses={201: PostSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        validate_customer_in_group(group, customer)
        
        request_data = request.data.copy()
        request_data['customer'] = customer.id
        request_data['group'] = group.group_id
        serializer = PostSerializer(data=request_data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save(customer=customer, group=group)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class YummoGroupSinglePostView(AuthenticatedCustomerViewClass):
    
    parser_classes = (MultiPartParser,)

    @swagger_auto_schema(
        operation_description="Get detailed info of a `Post`, with all its `Comment`.",
        tags=['posts'], responses={200: PostDetailedSerializer, 404: "Not Found"})
    def get(self, request, grpID, postID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        post = get_object_or_404(Post, post_id=postID)

        validate_post_in_group(group, post)
        validate_customer_in_group(group, request.user)

        serialized_post = PostDetailedSerializer(post)
        return Response(serialized_post.data, status=status.HTTP_200_OK)
        
        
    @swagger_auto_schema(
        operation_description="Add a new `Comment` to the current `Post`.",
        tags=['posts'], 
        request_body=CommentFormSerializer, 
        responses={201: "Created", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, grpID, postID):
        customer = request.user
        group = get_object_or_404(YummoGroup, group_id=grpID)
        post = get_object_or_404(Post, post_id=postID)

        validate_post_in_group(group, post)
        validate_customer_in_group(group, customer)

        request_data = request.data.copy()
        request_data['user'] = customer.id
        request_data['post'] = post.post_id
        serialized_comment = CommentSerializer(data=request_data)

        if not serialized_comment.is_valid():
            return Response(serialized_comment.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serialized_comment.save()
        return Response({"message": "Comment created successfully."}, status=status.HTTP_201_CREATED)
    
    @swagger_auto_schema(
        operation_description="Update information of a `Post` if the current Customer is the creator.",
        tags=['posts'], 
        request_body=PostFormSerializer, 
        responses={201: PostSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def put(self, request, grpID, postID):
        customer = request.user
        group = get_object_or_404(YummoGroup, group_id=grpID)
        post = get_object_or_404(Post, post_id=postID)

        validate_post_in_group(group, post)
        validate_customer_in_group(group, customer)
        validate_post_by_customer(post, customer)
        
        serialized_post = PostSerializer(post, data=request.data, partial=True)
        if not serialized_post.is_valid():
            return Response(serialized_post.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serialized_post.save()
        return Response(serialized_post.data, status=status.HTTP_201_CREATED)
        

    @swagger_auto_schema(
        operation_description="Delete the `Post` if the current Customer is the creator.",
        tags=['posts'], 
        responses={200: "OK", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, grpID, postID):
        customer = request.user
        group = get_object_or_404(YummoGroup, group_id=grpID)
        post = get_object_or_404(Post, post_id=postID)

        validate_post_in_group(group, post)
        validate_customer_in_group(group, customer)
        validate_post_by_customer(post, customer)
        
        post.delete()
        return Response({"message": "Post successfully deleted."}, status=status.HTTP_200_OK)
    