from .models import Reservation, Restaurant, Review, Cuisine
from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist, ValidationError
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
    
    def _handle_cuisines_field(self, instance, cuisines):
        
        if cuisines:
            try:
                instance.cuisine.clear()
                
                # Workaround to solve issue of Swagger not sending MultiPart form data of ListField correctly.
                # Swagger sends array of string as ['e1, e2, e3'] instead of ['e1', 'e2', 'e3']
                if len(cuisines) == 1:
                    cuisines = [s.strip() for s in cuisines[0].split(',')]
                
                for c in cuisines:
                    cuisine = Cuisine.objects.get(name=c)
                    instance.cuisine.add(cuisine)
                    
            except ObjectDoesNotExist as e:
                raise serializers.ValidationError({"detail": "The cuisine does not exist"})
            
    @transaction.atomic
    def create(self, validated_data):
        cuisines = validated_data.pop('cuisines')
        
        try:    
            location = get_lat_lng(validated_data['address'])
            validated_data['lat'] = location['lat']
            validated_data['lng'] = location['lng']
        except ValidationError as e:
            raise e
        
        try:
            with transaction.atomic():
                restaurant = Restaurant.objects.create(**validated_data)
                self._handle_cuisines_field(restaurant, cuisines)
        except ObjectDoesNotExist as e:
            raise serializers.ValidationError({"detail": "The cuisine does not exist"})

        return restaurant

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        
        address = validated_data.get('address', instance.address)
        try:
            if address != instance.address:
                location = get_lat_lng(address)
                instance.lat = location['lat']
                instance.lng = location['lng']
                instance.address = address
        except ValidationError as e:
            raise e
        
        instance.contact_no = validated_data.get('contact_no', instance.contact_no)
        instance.img = validated_data.get('img', instance.img)
        instance.price = validated_data.get('price', instance.price)
        self._handle_cuisines_field(instance, validated_data.get('cuisines', None))
        
        instance.save()
        return instance
    
    def get_location(self, obj):
        return {'lat': obj.lat, 'lng': obj.lng}

    
class ReservationSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer(read_only=True)
    restaurant_id = serializers.IntegerField(write_only=True)
    customer_name = serializers.StringRelatedField(source='customer')
    class Meta:
        model = Reservation
        fields = ['reservID', 'reserved_at', 'pax', 'restaurant_id', 'restaurant', 'customer', 'customer_name']


class ReservationPOSTFormSerializer(serializers.Serializer):
    reserved_at = serializers.DateField()
    pax = serializers.IntegerField(min_value=1)
    
    
class RestaurantPOSTFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    address = serializers.CharField(max_length=100)
    contact_no = serializers.CharField(max_length=20)
    img = serializers.ImageField(required=False)
    cuisines = serializers.ListField(child=serializers.CharField())
    price = serializers.IntegerField(min_value=1, max_value=5)
    
class RestaurantPUTFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50, required=False)
    address = serializers.CharField(max_length=100, required=False)
    contact_no = serializers.CharField(max_length=20, required=False)
    img = serializers.ImageField(required=False)
    cuisines = serializers.ListField(child=serializers.CharField(), required=False)
    price = serializers.IntegerField(min_value=1, max_value=5, required=False)
    
    
    
    

class SearchRestaurantSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200, default='NTU', help_text="A valid address that returns a location in Google Maps")
    radius = serializers.IntegerField(min_value=0, max_value=50000, default=1500, help_text="Optional. min=0, max=50000, default=1500")
    keyword = serializers.CharField(max_length=200, default='Asian', allow_blank=True, help_text="Optional")
    rankby = serializers.CharField(max_length=50, allow_blank=True, help_text="Optional. Two possible strings: distance or prominence(default)")
    price = serializers.IntegerField(min_value=1, default=3, max_value=5, required=False)
    rating = serializers.CharField(max_length=10, default='DESC', required=False, help_text="Optional. Accepts 'ASC' or 'DESC' only.")
    

class RestaurantRecommendationsSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=200, help_text="A valid address that returns a location in Google Maps")
    
    
    