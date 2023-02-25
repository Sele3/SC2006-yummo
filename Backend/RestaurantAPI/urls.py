from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
   #path('restaurants', ),
   path('test/<int:resID>/reservations/<int:reservID>', views.testview),
]