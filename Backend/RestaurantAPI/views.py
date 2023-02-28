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
    #Merchants only
    if not isMerchantGroup(request):
        return Response({'message':"Only Merchants can view the Restaurants under them"},status.HTTP_403_FORBIDDEN) 
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
def singleRestaurantView(request, resID):
    #Customers, Merchants
    if request.method == 'GET': 
        restaurant = get_object_or_404(Restaurant, pk=resID) 
        serialized_restaurant = RestaurantSerializer(restaurant)
        return Response(serialized_restaurant.data)
    
    #Merchants only
    if not isMerchantGroup(request):
        return Response({'message':"Only Merchants can edit their Restaurant details"},status.HTTP_403_FORBresIDDEN) 
    
    if request.method == 'PUT' or request.method == 'PATCH':
        restaurant = get_object_or_404(Restaurant, pk=resID, merchant=request.user)
        data = request.data.copy()
        if request.method == 'PUT':
            data['merchant'] = request.user.id
        partial = (request.method == 'PATCH')
        serialized_restaurant = RestaurantSerializer(restaurant,data=data, partial=partial)
        serialized_restaurant.is_valid(raise_exception=True)
        serialized_restaurant.save()
        return Response(serialized_restaurant.data, status=status.HTTP_200_OK)
        
    if request.method == 'DELETE':
        restaurant = get_object_or_404(Restaurant, pk=resID, merchant=request.user) #find specified Restaurant owned by this Merchant
        restaurant.delete()
        return Response({"message":"Restaurant deleted"}, status=status.HTTP_200_OK)
    

@api_view(['GET'])
def getRecommendationsView(request):
    pass
    
@api_view(['GET'])
def searchRestaurantsView(request):
    pass



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def reservationsView(request, resID):
    #Merchants only
    if request.method == 'GET':
        if not isMerchantGroup(request):
            return Response({'message':"Only Merchants can access this endpoint"},status.HTTP_403_FORBIDDEN) 
        restaurant = get_object_or_404(Restaurant, pk=resID, merchant=request.user)
        reservations = restaurant.reservations
        serialized_reservations = ReservationSerializer(reservations, many=True)
        return Response(serialized_reservations.data)
    
    #Customer only
    if not isCustomerGroup(request):
        return Response({'message':"Only Customers can make a reservation"},status.HTTP_403_FORBIDDEN)
    if  request.method == 'POST':
        data = request.data.copy()
        data['restaurant'] = resID
        data['customer'] = request.user.id
        serialized_reservation = ReservationSerializer(data=data)
        serialized_reservation.is_valid(raise_exception=True)
        serialized_reservation.save()
        return Response(serialized_reservation.data, status=status.HTTP_201_CREATED)
    


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def singleReservationView(request, resID, reservID):
    #Customers, Merchants
    if request.method == 'GET':
        if isCustomerGroup(request):
            reservation = get_object_or_404(Reservation, pk=reservID, customer=request.user)
        elif isMerchantGroup(request):
            restaurant = get_object_or_404(Restaurant, pk=resID, merchant=request.user) #check that this restaurant belong to this merchant
            reservation = get_object_or_404(restaurant.reservations, pk=reservID) #find the reservation from the restaurant's list of reservations
        
        serialized_reservation = ReservationSerializer(reservation)
        return Response(serialized_reservation.data)
    
    if not isCustomerGroup(request):
        return Response({'message':"Only Customers can edit their reservations"},status.HTTP_403_FORBIDDEN)
    
    if request.method == 'PUT' or request.method == 'PATCH':
        reservation = get_object_or_404(Reservation, pk=reservID, customer=request.user)
        data = request.data.copy()
        if request.method == 'PUT': #Only reservation time and pax can be changed
            data['restaurant'] = reservation.restaurant.resID
            data['customer'] = reservation.customer.id
        partial = (request.method=='PATCH')
        serialized_reservation = ReservationSerializer(reservation, data=data, partial=partial)
        serialized_reservation.is_valid(raise_exception=True)
        serialized_reservation.save()
        return Response(serialized_reservation.data)
    
    
    #Customers only
    if request.method == 'DELETE':
        reservation = get_object_or_404(Reservation, pk=reservID, 
                                        customer=request.user) #ensure that the reservation is under the correct Customer
        reservation.delete()
        return Response({"message":"Reservation deleted"}, status=status.HTTP_200_OK)
    
    
    
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def reviewsView(request, resID):
    if request.method == 'GET':
        restaurant = get_object_or_404(Restaurant, pk=resID)
        reviews = restaurant.reviews
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data)
    
    #Customers only
    if not isCustomerGroup(request):
        return Response({'message':"Only Customers can leave a review"},status.HTTP_403_FORBIDDEN)
    
    if request.method == 'POST':
        data = request.data.copy()
        data['restaurant']= resID
        data['customer']= request.user.id
        serialized_review = ReviewSerializer(data=data)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data, status=status.HTTP_201_CREATED)
    


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticatedOrReadOnly])
def singleReviewView(request, resID, review_id):
    if request.method == 'GET':
        review = get_object_or_404(Review,pk=review_id)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data)
    
    #Customers only
    if not isCustomerGroup(request):
        return Response({'message':"Only Customers can modify their review"},status.HTTP_403_FORBIDDEN)    
    
    if request.method == 'PUT' or request.method == 'PATCH':
        review = get_object_or_404(Review, pk=review_id, customer=request.user.id)
        restaurant = get_object_or_404(Restaurant, pk=resID)
        if restaurant.resID != review.restaurant.resID:
            return Response({"message":"The review requested does not belong to {}".format(restaurant.name)}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        if request.method == 'PUT': #Only rating and description can be changed
            data['restaurant'] = review.restaurant.resID
            data['customer'] = review.customer.id
        partial = (request.method=='PATCH')
        serialized_review = ReviewSerializer(review, data=data, partial=partial)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data)
    
    if request.method == 'DELETE':
        review = get_object_or_404(Review,pk=review_id, customer=request.user.id)
        review.delete()
        return Response({"message":"Re deleted"}, status=status.HTTP_200_OK)
        
    
