# Generated by Django 4.1.7 on 2023-03-24 06:51

from django.db import migrations
from ..models import Restaurant
from ..utils.googleAPI_utils import get_lat_lng


def update_restaurant_locations(apps, schema_editor):
    restaurants = Restaurant.objects.filter(lat__isnull=True, lng__isnull=True)
    for restaurant in restaurants:
        location = get_lat_lng(restaurant.address)
        restaurant.lat = location['lat']
        restaurant.lng = location['lng']
        restaurant.save()

class Migration(migrations.Migration):

    dependencies = [
        ('RestaurantAPI', '0010_restaurant_lat_restaurant_lng'),
    ]

    operations = [
        migrations.RunPython(update_restaurant_locations),
    ]
