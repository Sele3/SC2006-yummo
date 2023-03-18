from django.contrib import admin
from RestaurantAPI.models import Restaurant, Reservation, Review, Cuisine


@admin.register(Restaurant)
class RestaurantAdmin(admin.ModelAdmin):
    list_display = ['resID', 'name', 'location', 'avg_rating', 'merchant']
    
@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display=['reservID', 'reserved_at', 'pax', 'restaurant', 'customer']
    
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['review_id', 'rating', 'description', 'restaurant', 'customer']

@admin.register(Cuisine)
class CuisineAdmin(admin.ModelAdmin):
    list_display = ['cuisineID', 'name']