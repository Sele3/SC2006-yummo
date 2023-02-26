from .models import Reservation, Restaurant, Review
from django.contrib.auth.models import User, Group
from rest_framework import serializers
import datetime
from YummoGroupAPI.serializers import UserSerializer

class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurant
        fields = ['resID', 'name', 'location', 'avg_rating', 'merchant']
        extra_kwargs = {
            'avg_rating' : {'read_only' : True},
        }
        #depth = 1 



class ReservationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Reservation
        fields = ['reservID', 'reserved_at', 'pax', 'restaurant', 'customer']
        



class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
        fields = ['review_id', 'rating', 'description', 'restaurant', 'customer']