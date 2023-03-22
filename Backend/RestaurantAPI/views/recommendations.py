from django.shortcuts import get_object_or_404
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from ..models import Restaurant
from ..serializers import RestaurantSerializer, SearchRestaurantSerializer, RestaurantRecommendationsSerializer
from Yummo.utilityfunctions import AuthenticatedCustomerViewClass
from ..utils.googleAPI_utils import getGeocode, searchGoogleRestaurants, formatGoogleRestaurant, getDistanceMatrix, searchYummoRestaurants
import requests, random
from drf_yasg.utils import swagger_auto_schema

    
    

'''Currently, this only returns restaurants using Google's Geocoding API and Places API
Address string from request, is validated, then converted to latitude and longtitude coordinates using Geocoding API.
Additional parameters - radius, keyword, rankby - are processed, then used to find nearby restaurants using Places API (Nearby Search).

To-Do: Incorporate our own Restaurants (if they are nearby) into this search result. Look into Distance Matrix API.
'''
class SearchRestaurantsView(AuthenticatedCustomerViewClass):
       
    @swagger_auto_schema(operation_description=
                         ''' Returns a list of `Restaurant` based on the search query.
                         Address string from request, is validated, then converted to latitude and longtitude coordinates using Geocoding API.
                         There are 3 optional parameters - radius, keyword, rankby - which are processed, and then used to find nearby restaurants using 
                         Places API (Nearby Search).
                         ''',
                         tags=['search/recommend restaurants'],
                         request_body=SearchRestaurantSerializer,
                         responses={200: RestaurantSerializer(many=True), 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})                                              
    def post(self, request):
        geocode_json = getGeocode(request.data.get('address'))
        
        if geocode_json["status"] != "OK":
            return Response({'status':geocode_json["status"], 'error_message':geocode_json.get("error_message")}, status=status.HTTP_400_BAD_REQUEST)
        
        # status OK, Place found.
        location = geocode_json["results"][0]["geometry"]["location"]
        
        googleRestaurants_json = searchGoogleRestaurants(request=request, location=location)
        
        # Transform googleRestaurants into YummoRestaurant format
        googleRestaurants_YummoFormat = formatGoogleRestaurant(googleRestaurants_json)
        
        # Get YummoRestaurants that satisfy search query.
        yummoRestaurants = searchYummoRestaurants(request)
        # Merge with YummoRestaurant with GoogleRestaurant
        
        # Apply filter (if any)
        
        # return search results
        
        results = googleRestaurants_json #tentative
        
        return Response(results, status=status.HTTP_200_OK)



'''Currently, this returns 5 restaurants randomly from a nearby restaurant search using Places API.

To-Do: Incorporate our own Restaurants (if they are nearby) into this search result using Distance Matrix API.
Update the algorithm to select Restaurants based on Customer's history of reservations.
'''
class RestaurantRecommendationsView(AuthenticatedCustomerViewClass):
    
    @swagger_auto_schema(operation_description=
                         ''' Returns a list of recommended `Restaurant`.
                         ''',
                         tags=['search/recommend restaurants'],
                         request_body=RestaurantRecommendationsSerializer,
                         responses={200: RestaurantSerializer(many=True), 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def post(self, request):
        #GET NEARBY RESTAURANTS
       
        url = request.scheme + "://" + request.get_host() + reverse('searchRestaurants')  #http://127.0.0.1:8000/api/restaurants/search
        
        address = request.data.get("address")
        if not address:
            return Response({'message':"'address' field is required"}, status=status.HTTP_400_BAD_REQUEST)
        address = address.replace('#','') #cannot pass # into the address query
        
        payload = {
            "address": address #radius defaults to 1500m
        }
        data = requests.post(url=url,data=payload, headers={'Authorization': request.META.get('HTTP_AUTHORIZATION')})
        data_json = data.json()
        #print("data_json is", data_json)
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
        
        return Response(recommended_restaurants, status=status.HTTP_200_OK)        
    
    
