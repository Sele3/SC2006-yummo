from .models import Reservation, Restaurant, Review
from django.contrib.auth.models import User, Group
from rest_framework import serializers
import datetime
from YummoGroupAPI.serializers import UserSerializer


class ReservationSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.StringRelatedField(source='restaurant')
    customer_name = serializers.StringRelatedField(source='customer')
    class Meta:
        model = Reservation
        fields = ['reservID', 'reserved_at', 'pax', 'restaurant', 'restaurant_name', 'customer', 'customer_name']


class ReviewSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.StringRelatedField(source='restaurant')
    customer_name = serializers.StringRelatedField(source='customer')
    class Meta:
        model = Review
        fields = ['review_id', 'rating', 'description', 'restaurant', 'restaurant_name', 'customer', 'customer_name']


class RestaurantSerializer(serializers.ModelSerializer):
    merchant_name = serializers.StringRelatedField(source='merchant')
    #reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Restaurant
        fields = ['resID', 'name', 'location', 'avg_rating', 'merchant', 'merchant_name',
                  #'reviews'
                  ]
        extra_kwargs = {
            'avg_rating' : {'read_only' : True},
        }
