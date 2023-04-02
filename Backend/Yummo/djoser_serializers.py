from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions

User = get_user_model()

class CustomUserCreateSerializer(UserCreateSerializer):
    group_name = serializers.ChoiceField(choices=['Customers', 'Merchants'], write_only=True, help_text="`Customers` or `Merchants` only.")
    
    class Meta(UserCreateSerializer.Meta):
        fields = ['username', 'email', 'password', 'group_name']
        
        
        
    def validate(self, attrs):
        attrs_copy = attrs.copy()
        attrs_copy.pop('group_name')
        user = User(**attrs_copy)
        password = attrs.get("password")

        try:
            validate_password(password, user)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(
                {"password": serializer_error["non_field_errors"]}
            )

        return attrs
    
    def create(self, validated_data):
        try:
            validated_data_copy = validated_data.copy()
            validated_data_copy.pop('group_name')
            user = self.perform_create(validated_data_copy)
        except IntegrityError:
            self.fail("cannot_create_user")

        return user
    

class TokenRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    group_name = serializers.ChoiceField(choices=['Customers', 'Merchants'], help_text="`Customers` or `Merchants` only.")