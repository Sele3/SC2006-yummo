from .models import Reservation, Restaurant, Review, Cuisine
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .utils.googleAPI_utils import get_lat_lng



class CuisineSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Cuisine
        fields = ['cuisineID', 'name']
        validators = {
            UniqueValidator(queryset=Cuisine.objects.all())
        }


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
    #address = serializers.StringRelatedField(source='location')
    cuisine = CuisineSerializer(many=True, read_only=True)
    cuisines = serializers.ListField(child=serializers.CharField(), write_only=True)
    location = serializers.SerializerMethodField()


    class Meta:
        model = Restaurant
        fields = ['resID', 'name', 'address', 'contact_no', 'img', 'cuisine', 'cuisines', 
                  'avg_rating', 'price','merchant', 'merchant_name', 'location']
        extra_kwargs = {
            'avg_rating' : {'read_only' : True},
            'location': {'read_only' : True},
        }
    
    @transaction.atomic
    def create(self, validated_data):
        cuisines = validated_data.pop('cuisines')

        # Workaround to solve issue of Swagger not sending MultiPart form data of ListField correctly.
        # Swagger sends array of string as ['e1, e2, e3'] instead of ['e1', 'e2', 'e3']
        if len(cuisines) == 1:
            cuisines = [s.strip() for s in cuisines[0].split(',')]
        
        try:
            with transaction.atomic():
                restaurant = Restaurant.objects.create(**validated_data)
                for c in cuisines:
                    cuisine = Cuisine.objects.get(name=c) # raises DoesNotExist exception if the cuisine name is invalid
                    restaurant.cuisine.add(cuisine)
        except ObjectDoesNotExist as e:
            raise serializers.ValidationError({"detail": "The cuisine does not exist"})

        return restaurant

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.location = validated_data.get('location', instance.location)
        instance.img = validated_data.get('img', instance.img)
        
        cuisines = validated_data.get('cuisines', None)
        
        if cuisines:
            try:
                instance.cuisine.clear() #removes all objects from related cuisine set
                
                # Workaround to solve issue of Swagger not sending MultiPart form data of ListField correctly.
                # Swagger sends array of string as ['e1, e2, e3'] instead of ['e1', 'e2', 'e3']
                if len(cuisines) == 1:
                    cuisines = [s.strip() for s in cuisines[0].split(',')]
                
                for c in cuisines:
                    cuisine = Cuisine.objects.get(name=c) # raises DoesNotExist exception if the cuisine name is invalid
                    instance.cuisine.add(cuisine)
            except ObjectDoesNotExist as e:
                raise serializers.ValidationError({"detail": "The cuisine does not exist"})
            
        instance.save()
        return instance
    
    def get_location(self, obj):
        return get_lat_lng(obj.address)
    
    
    
class RestaurantPOSTFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    location = serializers.CharField(max_length=100)
    img = serializers.ImageField(required=False)
    cuisines = serializers.ListField(child=serializers.CharField())
    
    
class RestaurantPUTFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=False)
    location = serializers.CharField(max_length=100, required=False)
    img = serializers.ImageField(required=False)
    cuisines = serializers.ListField(child=serializers.CharField(), required=False)
    
    
class SearchRestaurantSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200, help_text="A valid address that returns a location in Google Maps")
    radius = serializers.IntegerField(min_value=0, max_value=50000, default=1500, help_text="Optional. min=0, max=50000, default=1500")
    keyword = serializers.CharField(max_length=200, allow_blank=True, help_text="Optional")
    rankby = serializers.CharField(max_length=50, allow_blank=True, help_text="Optional. Two possible strings: distance or prominence(default)")
    

class RestaurantRecommendationsSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200, help_text="A valid address that returns a location in Google Maps")