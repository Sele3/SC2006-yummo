from Yummo.utilityfunctions import isCustomerGroup, isMerchantGroup
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomerProfile, MerchantProfile
from .serializers import *
from Yummo.utilityfunctions import isCustomerGroup, isMerchantGroup
from drf_yasg.utils import swagger_auto_schema


@swagger_auto_schema(method='PUT', tags=["profile"], request_body=CustomerProfileSerializer)
@swagger_auto_schema(method='GET', tags=["profile"])
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profileView(request):
    if request.method == 'GET': 
        if isCustomerGroup(request):
            profile = get_object_or_404(CustomerProfile, user=request.user)
            serialized_profile = CustomerProfileSerializer(profile)
        elif isMerchantGroup(request):
            profile = get_object_or_404(MerchantProfile, user=request.user)
            serialized_profile = MerchantProfileSerializer(profile)
        else:
            return Response({"message": "There was an error when processing your request."}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serialized_profile.data, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        if isCustomerGroup(request):
            profile = get_object_or_404(CustomerProfile, user=request.user)
            request_data = request.data.copy()
            if request_data.get('user', {}).get('username') == request.user.username:
                request_data['user'].pop('username', None)
            serialized_profile = CustomerProfileSerializer(profile, data=request_data, partial=True)

        elif isMerchantGroup(request):
            profile = get_object_or_404(MerchantProfile, user=request.user)
            request_data = request.data.copy()
            if request_data.get('user', {}).get('username') == request.user.username:
                request_data['user'].pop('username', None)
            serialized_profile = MerchantProfileSerializer(profile, data=request_data, partial=True)

        if serialized_profile.is_valid():
            serialized_profile.save()
            return Response(serialized_profile.data, status=status.HTTP_201_CREATED)
        return Response(serialized_profile.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(method='GET', tags=["friends"])
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def friendsView(request):
    if request.method == 'GET': 
        if not isCustomerGroup(request):
            return Response({"message": "Only Customers can access this function"}, status=status.HTTP_403_FORBIDDEN) 
        
        profile = get_object_or_404(CustomerProfile, user=request.user)
        serialized_profile = FriendSerializer(profile)
        return Response(serialized_profile.data['friends'], status=status.HTTP_200_OK)


class SingleFriendView(APIView):
    permission_classes = [IsAuthenticated]

    def get_current_user_profile(self, request):
        return get_object_or_404(CustomerProfile, user=request.user)

    def get_requested_friend(self, username):
        return get_object_or_404(User, username=username)

    @swagger_auto_schema(tags=['friends'], responses={200: UserBasicInfoSerializer, 403: "Forbidden", 404: "Not Found"})
    def get(self, request, username):
        if not isCustomerGroup(request):
            return Response({"message": "Only Customers can access this function"}, status=status.HTTP_403_FORBIDDEN)

        current_user_profile = self.get_current_user_profile(request)
        friend_user = self.get_requested_friend(username)

        if friend_user in current_user_profile.friends.all():
            friend_profile = get_object_or_404(User, id=friend_user.id)
            serialized_friend = UserBasicInfoSerializer(friend_profile)
            return Response(serialized_friend.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "You are not friends with this user"}, status=status.HTTP_403_FORBIDDEN)

    @swagger_auto_schema(tags=['friends'], responses={201: "Created", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, username):
        current_user_profile = self.get_current_user_profile(request)

        if current_user_profile.user.username == username:
            return Response({'error': 'Unable to add yourself as friend.'}, status=status.HTTP_400_BAD_REQUEST)

        friend_user = self.get_requested_friend(username)

        if friend_user in current_user_profile.friends.all():
            return Response({'error': f'{username} is already in friends list.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.friends.add(friend_user)
        return Response({'success': f'{username} has been added to your friends list.'}, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(tags=['friends'], responses={204: "No Content", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, username):
        current_user_profile = self.get_current_user_profile(request)

        if current_user_profile.user.username == username:
            return Response({'error': 'Unable to remove yourself as friend.'}, status=status.HTTP_400_BAD_REQUEST)

        friend_user = self.get_requested_friend(username)

        if friend_user not in current_user_profile.friends.all():
            return Response({'error': f'{username} is not in your friends list.'}, status=status.HTTP_400_BAD_REQUEST)

        current_user_profile.friends.remove(friend_user)
        return Response({'success': f'{username} has been removed from your friends list.'}, status=status.HTTP_204_NO_CONTENT)
