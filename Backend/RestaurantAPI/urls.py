from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
   path('restaurants', views.restaurantsView),
   path('restaurants/<int:resID>', views.singleRestaurantView),
   path('restaurants/recommendations', views.getRecommendationsView),
   path('restaurants/search', views.searchRestaurantsView, name='searchRestaurants'),
   path('restaurants/<int:resID>/reservations', views.reservationsView),
   path('restaurants/<int:resID>/reservations/<int:reservID>', views.singleReservationView),
   path('restaurants/<int:resID>/reviews', views.reviewsView),
   path('restaurants/<int:resID>/reviews/<int:review_id>', views.singleReviewView),
]
