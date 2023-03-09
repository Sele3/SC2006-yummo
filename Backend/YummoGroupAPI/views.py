from Yummo.utilityfunctions import *
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from .models import CustomerProfile
from .serializers import *
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class ProfileView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(tags=["profile"], responses={200: CustomerProfileSerializer, 400: "Bad Request"})
    def get(self, request):
        try:
            profile, serializer_class = getProfile(request), getProfileSerializer(request)
        except ExceptionWithResponse as e:
            return Response({"message": str(e)}, status=e.get_status_code()) 
        
        serialized_profile = serializer_class(profile)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=["profile"], request_body=CustomerProfileSerializer, responses={201: CustomerProfileSerializer, 400: "Bad Request"})
    def put(self, request):
        try:
            profile, serializer_class = getProfile(request), getProfileSerializer(request)
        except ExceptionWithResponse as e:
            return Response({"message": str(e)}, status=e.get_status_code()) 

        request_data = request.data.copy()
        if request_data.get('user', {}).get('username') == request.user.username:
            request_data['user'].pop('username', None)
        serialized_profile = serializer_class(profile, data=request_data, partial=True)

        if not serialized_profile.is_valid():
            return Response(serialized_profile.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serialized_profile.save()
        return Response(serialized_profile.data, status=status.HTTP_201_CREATED)


class FriendsView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(tags=['friends'], responses={200: UserBasicInfoSerializer(many=True)})
    def get(self, request):
        profile = get_object_or_404(CustomerProfile, user=request.user)
        serialized_profile = UserBasicInfoSerializer(profile.friends, many=True)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)


class SingleFriendView(AuthenticatedCustomerViewClass):
    def get_requested_friend(self, username):
        return get_object_or_404(User, username=username)


    @swagger_auto_schema(tags=['friends'], responses={200: UserBasicInfoSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def get(self, request, username):
        try:
            current_user_profile = getProfile(request)
        except ExceptionWithResponse as e:
            return Response({"message": str(e)}, status=e.get_status_code()) 
        
        friend_user = self.get_requested_friend(username)

        if friend_user in current_user_profile.friends.all():
            friend_profile = get_object_or_404(User, id=friend_user.id)
            serialized_friend = UserBasicInfoSerializer(friend_profile)
            return Response(serialized_friend.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You are not friends with this user"}, status=status.HTTP_403_FORBIDDEN)

    @swagger_auto_schema(tags=['friends'], responses={201: "Created", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, username):
        try:
            current_user_profile = getProfile(request)
        except ExceptionWithResponse as e:
            return Response({"message": str(e)}, status=e.get_status_code()) 
        
        if current_user_profile.user.username == username:
            return Response({'message': 'Unable to add yourself as friend.'}, status=status.HTTP_400_BAD_REQUEST)
        
        friend_user = self.get_requested_friend(username)
        if friend_user in current_user_profile.friends.all():
            return Response({'message': f'{username} is already in friends list.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.friends.add(friend_user)
        return Response({'message': f'{username} has been added to your friends list.'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(tags=['friends'], responses={200: "OK", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, username):
        try:
            current_user_profile = getProfile(request)
        except ExceptionWithResponse as e:
            return Response({"message": str(e)}, status=e.get_status_code()) 

        if current_user_profile.user.username == username:
            return Response({'message': 'Unable to remove yourself as friend.'}, status=status.HTTP_400_BAD_REQUEST)

        friend_user = self.get_requested_friend(username)
        if friend_user not in current_user_profile.friends.all():
            return Response({'message': f'{username} is not in your friends list.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.friends.remove(friend_user)
        return Response({'message': f'{username} has been removed from your friends list.'}, status=status.HTTP_200_OK)


class YummoGroupsView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(tags=['groups'], responses={200: YummoGroupSerializer(many=True), 403: "Forbidden"})
    def get(self, request):
        groups = YummoGroup.objects.all()
        serialized_groups = YummoGroupSerializer(groups, many=True)
        return Response(serialized_groups.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=['groups'], request_body=YummoGroupSerializer, responses={201: YummoGroupSerializer, 400: "Bad Request", 403: "Forbidden"})
    def post(self, request):
        serializer = YummoGroupSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        if not request.data.get('name', '').strip():
            return Response({'message': 'Please provide a group name'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if group with same name already exists
        # group_name = serializer.validated_data['name']
        # if YummoGroup.objects.filter(name=group_name).exists():
        #     return Response({"message": f"A group with the name '{group_name}' already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Create new group
        group = serializer.save()
        # Add current user to group
        group.customers.add(request.user) 
        serialized_group = YummoGroupSerializer(group)
        return Response(serialized_group.data, status=status.HTTP_201_CREATED)
        

class SingleCustomerYummoGroups(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(tags=['groups'], responses={200: YummoGroupSerializer(many=True), 403: "Forbidden"})
    def get(self, request):
        groups = request.user.yummogroups.all()
        serialized_groups = YummoGroupSerializer(groups, many=True)
        return Response(serialized_groups.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        tags=['groups'], 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, 
            properties={'group_name': openapi.Schema(type=openapi.TYPE_STRING)}),
            responses={200: YummoGroupSerializer(many=True), 403: "Forbidden"})
    def post(self, request):
        group_name = request.data.get('group_name', '')
        if not group_name:
            return Response({'message': 'Please provide a group name'}, status=status.HTTP_400_BAD_REQUEST)
        
        groups = YummoGroup.objects.filter(name=group_name)
        serialized_groups = YummoGroupSerializer(groups, many=True)
        return Response(serialized_groups.data, status=status.HTTP_200_OK)
        

class SingleYummoGroupView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(tags=['groups'], responses={200: YummoGroupSerializer, 403: "Forbidden", 404: "Not Found"})
    def get(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        serialized_group = YummoGroupSerializer(group)
        return Response(serialized_group.data, status=status.HTTP_200_OK)
        
        
    @swagger_auto_schema(tags=['groups'], responses={201: "Created", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        if group.customers.filter(id=customer.id).exists():
            return Response({"message": "You are already part of this group."}, status=status.HTTP_400_BAD_REQUEST)
        
        group.customers.add(customer)
        group.save()
        return Response({"message": "You have successfully joined the group."}, status=status.HTTP_201_CREATED)
        

    @swagger_auto_schema(tags=['groups'], responses={200: "OK", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        if not group.customers.filter(id=customer.id).exists():
            return Response({"message": "You are not part of this group."}, status=status.HTTP_400_BAD_REQUEST)
        
        group.customers.remove(customer)
        group.save()
        return Response({"message": "You have successfully left the group."}, status=status.HTTP_200_OK)
