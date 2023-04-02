from Yummo.utilityfunctions import AuthenticatedViewClass, OPERATION_DESCRIPTION_ALLOWANY
from rest_framework import status
from rest_framework.response import Response
from ..serializers import CustomerProfileSerializer
from ..utils.profile_utils import getProfile, getProfileSerializer
from drf_yasg.utils import swagger_auto_schema


class ProfileView(AuthenticatedViewClass):
    @swagger_auto_schema(
        operation_description="Get `Profile` of current `User`." + OPERATION_DESCRIPTION_ALLOWANY,
        tags=["profile"], 
        responses={200: CustomerProfileSerializer, 400: "Bad Request"})
    def get(self, request):
        profile = getProfile(request)
        serializer_class = getProfileSerializer(request)
        
        serialized_profile = serializer_class(profile)
        return Response(serialized_profile.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Update `Profile` of current `User`." + OPERATION_DESCRIPTION_ALLOWANY,
        tags=["profile"], 
        request_body=CustomerProfileSerializer, 
        responses={201: CustomerProfileSerializer, 400: "Bad Request"})
    def put(self, request):
        profile = getProfile(request)
        serializer_class = getProfileSerializer(request)

        request_data = request.data.copy()
        if request_data.get('user', {}).get('username') == request.user.username:
            request_data['user'].pop('username', None)
        serialized_profile = serializer_class(profile, data=request_data, partial=True)

        if not serialized_profile.is_valid():
            return Response(serialized_profile.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serialized_profile.save()
        return Response(serialized_profile.data, status=status.HTTP_201_CREATED)
    