from djoser.views import UserViewSet
from django.contrib.auth.models import Group
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from djoser.serializers import UserCreateSerializer

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = ('id', 'email', 'username', 'password')

class CustomUserViewSet(UserViewSet):
    permission_classes = []
    serializer_class = CustomUserCreateSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        if user.groups.filter(name='Customers').exists():
            customer_group = Group.objects.get(name='Customers')
            customer_group.user_set.add(user)
        elif user.groups.filter(name='Merchants').exists():
            merchant_group = Group.objects.get(name='Merchants')
            merchant_group.user_set.add(user)

        # create token for the user
        token = Token.objects.create(user=user)
        token_serializer = AuthTokenSerializer(instance=token)
        response_data = {
            'user': serializer.data,
            'token': token_serializer.data,
        }
        serializer.validated_data['token'] = token.key
        return Response(response_data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def create_customer(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return response

    @action(detail=False, methods=["post"])
    def create_merchant(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return response
