from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from djoser.serializers import TokenSerializer
from .djoser_serializers import TokenRequestSerializer

class CustomAuthToken(ObtainAuthToken):
    @swagger_auto_schema(
        operation_description='Use this endpoint to obtain user token',
        tags=['auth'], 
        request_body=TokenRequestSerializer,
        responses={200: TokenSerializer, 400: 'Bad Request'},)
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        if 'group_name' not in request.data:
            return Response({'detail': 'group_name field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if user is in the correct group
        if request.data.get('group_name') == 'Customers':
            group = get_object_or_404(Group, name='Customers')
        elif request.data.get('group_name') == 'Merchants':
            group = get_object_or_404(Group, name='Merchants')
        else:
            return Response({'detail': 'Invalid group_name'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.groups.filter(name=group.name).exists():
            return Response({'detail': 'The user does not belong in this group'}, status=status.HTTP_400_BAD_REQUEST)

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
