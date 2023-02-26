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
# Create your views here.




@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def restaurantsView(request):
    if request.method == 'GET':
       #restaurant_list = Restaurant.objects.filter(merchant=request.user)
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
@permission_classes([IsAuthenticated])
def singleRestaurantView(request, id):
    pass



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
    
    
