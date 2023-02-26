from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
   path('restaurants', views.restaurantsView),
   path('restaurants/<int:id>', views.singleRestaurantView),
   path('restaurants/<int:id>/reservations', views.reservationView),
]
