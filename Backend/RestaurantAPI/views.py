from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.contrib.auth.models import User, Group
from django.core.paginator import Paginator, EmptyPage
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from decimal import Decimal
from .models import Restaurant, Reservation, Review
from .serializers import RestaurantSerializer, ReservationSerializer, ReviewSerializer
from Yummo.utilityfunctions import isCustomerGroup, isMerchantGroup
from Yummo.settings import GOOGLE_API_KEY
import requests, random
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi



@swagger_auto_schema(method='POST', request_body=RestaurantSerializer)
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
    
@swagger_auto_schema(methods=['PUT', 'PATCH'], request_body=RestaurantSerializer)
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
        return Response({'message':"Only Merchants can edit their Restaurant details"},status.HTTP_403_FORBIDDEN) 
    
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
    


'''Currently, this returns 5 restaurants randomly from a nearby restaurant search using Places API.

To-Do: Incorporate our own Restaurants (if they are nearby) into this search result using Distance Matrix API.
Update the algorithm to select Restaurants based on Customer's history of reservations.
'''
@swagger_auto_schema(method='POST', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT, 
    properties={'address': openapi.Schema(type=openapi.TYPE_STRING)}))
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getRecommendationsView(request):
    #GET NEARBY RESTAURANTS
    url = request.scheme + "://" + request.get_host() + reverse('searchRestaurants')  #http://127.0.0.1:8000/api/restaurants/search
    #print(url)
    address = request.data.get("address")
    if not address:
        return Response({'message':"'location' field is required"}, status=status.HTTP_400_BAD_REQUEST)
    address = address.replace('#','') #cannot pass # into the address query
    
    payload = {
        "address": address #radius defaults to 1500m
    }
    data = requests.post(url=url,data=payload)
    data_json = data.json()
    if data_json["status"] != "OK":
        return Response({'message':data_json["status"], 'error_message':data_json.get("error_message")}, status=status.HTTP_400_BAD_REQUEST)
    
    results = data_json["results"] #list of Place objects
    
    
    #CHANGE THIS TO AN ALGORITHM FOR SELECTING RESTAURANTS
    #Randomly sample 5 restaurants from this list 
    try:
        recommended_restaurants= random.sample(results, 5)
    except ValueError:
        #there are less than 5 results
        print("there are less than 5 results")
        recommended_restaurants = results
    
    return Response(recommended_restaurants)
    
    
    

'''Currently, this only returns restaurants using Google's Geocoding API and Places API
Address string from request, is validated, then converted to latitude and longtitude coordinates using Geocoding API.
Additional parameters - radius, keyword, rankby - are processed, then used to find nearby restaurants using Places API (Nearby Search).

To-Do: Incorporate our own Restaurants (if they are nearby) into this search result. Look into Distance Matrix API.
'''
@swagger_auto_schema(method='POST', request_body=openapi.Schema(
    type=openapi.TYPE_OBJECT, 
    properties={
        'address': openapi.Schema(type=openapi.TYPE_STRING),
        'radius': openapi.Schema(type=openapi.TYPE_STRING, description="optional", default=""),
        'keyword': openapi.Schema(type=openapi.TYPE_STRING, description="optional", default=""),
        'rankby': openapi.Schema(type=openapi.TYPE_STRING, description="optional", default="")}))  
@api_view(['POST'])
@permission_classes([AllowAny])
def searchRestaurantsView(request):
    format = "json" #accepts json or xml
    
    #get the human-readable adress string from request
    address = request.data.get("address")
    if not address:
        return Response({'message':"'location' field is required"}, status=status.HTTP_400_BAD_REQUEST)
    address = address.replace('#','') #cannot pass # into the address query
    
    #Using Geocoding API, convert address to latitude & longtitude coordinates
    url = f"https://maps.googleapis.com/maps/api/geocode/{format}?address={address}&key={GOOGLE_API_KEY}"
    
    geocode = requests.get(url)
    geocode_json = geocode.json()

    if geocode_json["status"] != "OK":
        return Response({'status':geocode_json["status"], 'error_message':geocode_json.get("error_message")}, status=status.HTTP_400_BAD_REQUEST)
    
    #status OK, Place found. Retrieve the lat & lng coordinates
    location = geocode_json["results"][0]["geometry"]["location"]
    lat = location["lat"]
    lng = location["lng"]
    
    #Using Places API - nearby search, find nearby restaurants with filter
    type = "restaurant" #fixed
    radius = "&radius=1500" #in metres, DEFAULT set to 1500
    if request.data.get("radius"):
        radius = "&radius=" + request.data.get("radius")
    
    #optional parameters
    keyword = rankby = ""
    
    if request.data.get("keyword"):
        keyword = "&keyword=" + request.data.get("keyword")

    if request.data.get("rankby") == 'distance': #two possible values: distance or prominence (default)
        rankby = "&rankby=distance" 
        radius = "" #sets radius to empty string as rankby cannot be used in conjunction with radius
   
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/{format}?location={lat}%2C{lng}{radius}{keyword}{rankby}&type={type}&key={GOOGLE_API_KEY}"
    response = requests.get(url)
    return Response(response.json())


@swagger_auto_schema(method='POST', request_body=ReservationSerializer)
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
    if request.method == 'POST':
        data = request.data.copy()
        data['restaurant'] = resID
        data['customer'] = request.user.id
        serialized_reservation = ReservationSerializer(data=data)
        serialized_reservation.is_valid(raise_exception=True)
        serialized_reservation.save()
        return Response(serialized_reservation.data, status=status.HTTP_201_CREATED)
    

@swagger_auto_schema(methods=['PUT', 'PATCH'], request_body=ReservationSerializer)
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
    
    
    
@swagger_auto_schema(method='POST', request_body=ReviewSerializer)    
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
    

@swagger_auto_schema(methods=['PUT', 'PATCH'], request_body=ReviewSerializer)
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
        return Response({"message":"Review deleted"}, status=status.HTTP_200_OK)
        
    
