from django.db import models
from django.contrib.auth.models import User
import datetime

class Restaurant(models.Model):
    resID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2 ,default=0.0)
    merchant = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Merchants'},
        related_name='restaurants' #user.restaurant will return the restaurants related to this Merchant
        ) 
    
    def __str__(self):
        return self.name
    


class Reservation(models.Model):
    reservID = models.AutoField(primary_key=True)
    reserved_at = models.DateTimeField()
    pax = models.IntegerField()
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE,
        related_name='reservations'
        )
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'},
        related_name='reservations'
        )
    
    def __str__(self):
        return "Reservation {} by {} at {}".format(self.reservID, self.customer.get_username(), self.restaurant.name)
    

class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    rating = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        default=0)
    description = models.CharField(max_length=255, blank=True)
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE,
        related_name='reviews'
        )
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'},
        related_name='reviews'
        )
    
    def __str__(self):
        return "Review {} by {} at {}".format(self.review_id, self.customer.get_username(), self.restaurant.name)
    