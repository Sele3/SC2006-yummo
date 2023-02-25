from .models import Reservation, Restaurant, Review
from django.contrib.auth.models import User
from rest_framework import serializers
import datetime


class RestaurantSerializer(serializers.ModelSerializer):
    
    class Meta:
        fields = '__all__'



class ReservationSerializer(serializers.ModelSerializer):
    pass



class ReviewSerializer(serializers.ModelSerializer):
    pass