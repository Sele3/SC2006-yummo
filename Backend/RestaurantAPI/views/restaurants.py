from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from ..models import Restaurant
from ..serializers import RestaurantSerializer, RestaurantPOSTFormSerializer, RestaurantPUTFormSerializer
from drf_yasg.utils import swagger_auto_schema
from Yummo.utilityfunctions import AuthenticatedMerchantViewClass, IsMerchant, AuthenticatedViewClass


class RestaurantsView(AuthenticatedMerchantViewClass):
    parser_classes = (MultiPartParser,)
    
    @swagger_auto_schema(operation_description='''Get list of all `Restaurant` that belongs to this Merchant.
                         \nAuthorization: `Merchant`
                         ''',
                         tags=['restaurants'], 
                         responses={200: RestaurantSerializer(many=True)})
    def get(self, request):
        restaurant_list = request.user.restaurants
        serialized_restaurant_list = RestaurantSerializer(restaurant_list, many=True)
        return Response(serialized_restaurant_list.data, status=status.HTTP_200_OK)


    @swagger_auto_schema(operation_description='''Create a new `Restaurant` under this Merchant.                       
                         \nAuthorization: `Merchant`
                         ''',
                         tags=['restaurants'], 
                         request_body=RestaurantPOSTFormSerializer, 
                         responses={201: RestaurantSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request):
        data = request.data.copy() #make it mutable
        data['merchant'] = request.user.id #current User is the Merchant for the Restaurant
        serialized_restaurant = RestaurantSerializer(data=data)
        serialized_restaurant.is_valid(raise_exception=True)
        serialized_restaurant.save()
        return Response(serialized_restaurant.data, status=status.HTTP_201_CREATED)


class SingleRestaurantView(AuthenticatedViewClass):
    parser_classes = (MultiPartParser,)
    
    @swagger_auto_schema(operation_description='''Get detailed info of a `Restaurant` specified by `resID`.
                         \nAuthorization: `AllowAny`
                         ''',
                         tags=['restaurants'], 
                         responses={200: RestaurantSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def get(self, request, resID):
        restaurant = get_object_or_404(Restaurant, pk=resID) 
        serialized_restaurant = RestaurantSerializer(restaurant)
        return Response(serialized_restaurant.data, status=status.HTTP_200_OK)
    
    
    @swagger_auto_schema(operation_description='''Update information of the `Restaurant` specified by `resID` if current Merchant is the owner.                       
                         \nAuthorization: `Merchant`
                         ''',
                         tags=['restaurants'], 
                        request_body=RestaurantPUTFormSerializer, 
                        responses={200: RestaurantSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def put(self, request, resID):
        restaurant = get_object_or_404(Restaurant, pk=resID, merchant=request.user)
        data = request.data.copy()
        data['merchant'] = request.user.id
        serialized_restaurant = RestaurantSerializer(restaurant,data=data, partial=True)
        serialized_restaurant.is_valid(raise_exception=True)
        serialized_restaurant.save()
        return Response(serialized_restaurant.data, status=status.HTTP_200_OK)
    
    
    @swagger_auto_schema(operation_description='''Delete the `Restaurant` specified by `resID` if current Merchant is the owner.
                         \nAuthorization: `Merchant`
                         ''',
                         tags=['restaurants'], 
                         responses={200: "OK", 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, resID):
        restaurant = get_object_or_404(Restaurant, pk=resID, merchant=request.user) #find specified Restaurant owned by this Merchant
        restaurant.delete()
        return Response({"message":"Restaurant deleted"}, status=status.HTTP_200_OK)
    
    
    # GET method does not need authentication
    # PUT, DELETE method requires Merchants access
    def get_permissions(self):
        permission_classes = []
        if self.request.method != 'GET':
            permission_classes = super().permission_classes.copy()
            permission_classes.append(IsMerchant)
        return [permission() for permission in permission_classes]


