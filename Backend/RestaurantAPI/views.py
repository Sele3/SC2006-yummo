from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from decimal import Decimal
from django.contrib.auth.models import User, Group
from .models import Restaurant, Reservation, Review
from .serializers import RestaurantSerializer, ReservationSerializer, ReviewSerializer
from django.core.paginator import Paginator, EmptyPage
import datetime
from Yummo.utilityfunctions import isCustomerGroup, isMerchantGroup
# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def restaurantsView(request):
    if not isMerchantGroup(request):
        return Response({'message':"Only Merchants access this endpoint"},status.HTTP_403_FORBIDDEN)    
    if request.method == 'GET':
        restaurant_list = request.user.restaurants
        serialized_restaurant_list = RestaurantSerializer(restaurant_list, many=True)
        return Response(serialized_restaurant_list.data)

    if request.method == 'POST':
        data = request.data.copy() #make it mutable
        data['merchant'] = request.user.id #current User is the Merchant for the Restaurant
        serialized_restaurant = RestaurantSerializer(data=data)
        serialized_restaurant.is_valid(raise_exception=True)
        serialized_restaurant.save()
        return Response(serialized_restaurant.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def singleRestaurantView(request, id):
    #Customers, Merchants
    if request.method == 'GET': 
        restaurant = get_object_or_404(Restaurant, pk=id) 
        serialized_restaurant = RestaurantSerializer(restaurant)
        return Response(serialized_restaurant.data)
    
    #Merchants only
    if not isMerchantGroup(request):
        return Response({'message':"Only Merchants access this endpoint"},status.HTTP_403_FORBIDDEN) 
    
    if request.method == 'PUT' or 'PATCH':
        restaurant = get_object_or_404(Restaurant, pk=id, merchant=request.user)
        data = request.data.copy()
        data['merchant'] = request.user.id
        partial = True
        if request.method == 'PUT':
            partial = False
        serialized_restaurant = RestaurantSerializer(restaurant,data=data, partial=partial)
        serialized_restaurant.is_valid(raise_exception=True)
        serialized_restaurant.save()
        return Response(serialized_restaurant.data, status=status.HTTP_200_OK)
        
    if request.method == 'DELETE':
        restaurant = get_object_or_404(Restaurant, pk=id, merchant=request.user) #find specified Restaurant owned by this Merchant
        restaurant.delete()
        return Response({"message":"Restaurant deleted"}, status=status.HTTP_200_OK)
    



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def reservationView(request, id):
    if request.method == 'GET':
        restaurant = get_object_or_404(Restaurant, pk=id)
        reservations = restaurant.reservations
        serialized_reservations = ReservationSerializer(reservations, many=True)
        return Response(serialized_reservations.data)
    
    if  request.method == 'POST':
        pass
    
    
