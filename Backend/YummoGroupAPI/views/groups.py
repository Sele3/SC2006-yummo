from Yummo.utilityfunctions import AuthenticatedCustomerViewClass
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from ..utils.group_utils import validate_customer_in_group
from ..serializers import *
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class YummoGroupsView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(
        operation_description="Get list of all `YummoGroup` in database.",
        tags=['groups'], 
        responses={200: YummoGroupSerializer(many=True), 403: "Forbidden"})
    def get(self, request):
        groups = YummoGroup.objects.all()
        serialized_groups = YummoGroupSerializer(groups, many=True)
        return Response(serialized_groups.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create a new `YummoGroup`.",
        tags=['groups'], 
        request_body=YummoGroupSerializer, responses={201: YummoGroupSerializer, 400: "Bad Request", 403: "Forbidden"})
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
        group = serializer.save(owner=request.user)
        # Add current user to group
        group.customers.add(request.user) 
        serialized_group = YummoGroupSerializer(group)
        return Response(serialized_group.data, status=status.HTTP_201_CREATED)
        

class SingleCustomerYummoGroups(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(
        operation_description="Get list of `YummoGroup` that current Customer has joined.",
        tags=['groups'], responses={200: YummoGroupSerializer(many=True), 403: "Forbidden"})
    def get(self, request):
        groups = request.user.yummogroups.all()
        serialized_groups = YummoGroupSerializer(groups, many=True)
        return Response(serialized_groups.data, status=status.HTTP_200_OK)
        

class SingleYummoGroupView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(
        operation_description="Get full information of a `YummoGroup`.",
        tags=['groups'], 
        responses={200: YummoGroupSerializer, 403: "Forbidden", 404: "Not Found"})
    def get(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        serialized_group = YummoGroupSerializer(group)
        return Response(serialized_group.data, status=status.HTTP_200_OK)
        
    @swagger_auto_schema(
        operation_description="Join a `YummoGroup`.",
        tags=['groups'], 
        responses={201: "Created", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        if group.customers.filter(id=customer.id).exists():
            return Response({"message": "You are already part of this group."}, status=status.HTTP_400_BAD_REQUEST)
        
        group.customers.add(customer)
        group.save()
        return Response({"message": "You have successfully joined the group."}, status=status.HTTP_201_CREATED)
        
    @swagger_auto_schema(
        operation_description="Change the owner of a `YummoGroup`.",
        tags=['groups'], 
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, 
            properties={'username': openapi.Schema(type=openapi.TYPE_STRING)}),
        responses={200: "OK", 400: "Bad Request", 404: "Not Found"})
    def put(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        validate_customer_in_group(group, customer)

        username = request.data.get('username', None)
        new_owner = get_object_or_404(User, username=username)

        if new_owner == customer:
            return Response({"message": "You are already the owner of this group."}, status=status.HTTP_400_BAD_REQUEST)

        validate_customer_in_group(group, new_owner)

        group.owner = new_owner
        group.save()
        return Response({"message": "The owner of the group has been changed."}, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        operation_description="Leave a `YummoGroup`. If the Customer leaving is the owner, the `YummoGroup` will be deleted as well.",
        tags=['groups'], 
        responses={200: "OK", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, grpID):
        group = get_object_or_404(YummoGroup, group_id=grpID)
        customer = request.user

        validate_customer_in_group(group, customer)

        if group.owner == customer:
            group.delete()
            return Response({"message": "You have successfully left the group and the group has been deleted."}, status=status.HTTP_200_OK)
        
        group.customers.remove(customer)
        group.save()
        return Response({"message": "You have successfully left the group."}, status=status.HTTP_200_OK)


class SearchYummoGroupByNameView(AuthenticatedCustomerViewClass):
    @swagger_auto_schema(
        operation_description="Search for a `YummoGroup` based on the `groupname`" + OPERATION_DESCRIPTION_CUSTOMER,
        tags=['groups'], 
        responses={200: YummoGroupSerializer(many=True)})
    def get(self, request, groupname):
        groups = YummoGroup.objects.filter(name__iexact=groupname)
        serialized_groups = YummoGroupSerializer(groups, many=True)
        return Response(serialized_groups.data, status=status.HTTP_200_OK)
    