from .models import Reservation, Restaurant, Review
from django.contrib.auth.models import User, Group
from rest_framework import serializers
import datetime


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


class SearchRestaurantSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200, help_text="A valid address that returns a location in Google Maps")
    radius = serializers.IntegerField(min_value=0, max_value=50000, default=1500, help_text="Optional. min=0, max=50000, default=1500")
    keyword = serializers.CharField(max_length=200, allow_blank=True, help_text="Optional")
    rankby = serializers.CharField(max_length=50, allow_blank=True, help_text="Optional. Two possible strings: distance or prominence(default)")
    

class RestaurantRecommendationsSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200, help_text="A valid address that returns a location in Google Maps")