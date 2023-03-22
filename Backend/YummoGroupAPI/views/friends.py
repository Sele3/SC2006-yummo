from Yummo.utilityfunctions import AuthenticatedCustomerViewClass
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from ..models import CustomerProfile
from ..serializers import UserBasicInfoSerializer
from ..utils.profile_utils import getProfile
from drf_yasg.utils import swagger_auto_schema


class FriendsView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(
        operation_description="Get the list of `Friends` of the current Customer.",
        tags=['friends'], 
        responses={200: UserBasicInfoSerializer(many=True)})
    def get(self, request):
        profile = get_object_or_404(CustomerProfile, user=request.user)
        serialized_profile = UserBasicInfoSerializer(profile.friends, many=True)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)


class SingleFriendView(AuthenticatedCustomerViewClass):
    def get_requested_friend(self, username):
        return get_object_or_404(User, username=username)


    @swagger_auto_schema(
        operation_description="Get basic information of a `Customer` profile.",
        tags=['friends'], 
        responses={200: UserBasicInfoSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def get(self, request, username):
        friend_user = self.get_requested_friend(username)
        serialized_friend = UserBasicInfoSerializer(friend_user)
        return Response(serialized_friend.data, status=status.HTTP_200_OK)
        
    @swagger_auto_schema(
        operation_description="Add a new `Customer` to current Customer's friend list.",
        tags=['friends'], 
        responses={201: "Created", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, username):
        current_user_profile = getProfile(request)
        
        if current_user_profile.user.username == username:
            return Response({'message': 'Unable to add yourself as friend.'}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_user = self.get_requested_friend(username)
        if friend_user in current_user_profile.friends.all():
            return Response({'message': f'{username} is already in friends list.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.friends.add(friend_user)
        return Response({'message': f'{username} has been added to your friends list.'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_description="Remove a `Customer` from current Customer's friend list.",
        tags=['friends'], 
        responses={200: "OK", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, username):
        current_user_profile = getProfile(request)

        if current_user_profile.user.username == username:
            return Response({'message': 'Unable to remove yourself as friend.'}, status=status.HTTP_400_BAD_REQUEST)

        friend_user = self.get_requested_friend(username)
        if friend_user not in current_user_profile.friends.all():
            return Response({'message': f'{username} is not in your friends list.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.friends.remove(friend_user)
        return Response({'message': f'{username} has been removed from your friends list.'}, status=status.HTTP_200_OK)
    