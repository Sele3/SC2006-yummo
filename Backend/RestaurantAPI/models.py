from django.db import models
from django.db.models import Avg, Q
from django.contrib.auth.models import User


class Cuisine(models.Model):
    cuisineID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name
    

class Restaurant(models.Model):
    resID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=20, blank=True, null=True)
    img = models.ImageField(upload_to='images/restaurant', default='images/restaurant/default-restaurant-icon2.jpg', null=True, blank=True)
    cuisine = models.ManyToManyField(
        Cuisine,
        related_name='restaurants',
        blank=True,
        default=Cuisine.objects.get_or_create(name='Asian')[0].cuisineID,
    )
    avg_rating = models.DecimalField(max_digits=3, decimal_places=2 ,default=0.0)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    lng = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    price = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        default=3)
    merchant = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Merchants'},
        #user.restaurant will return the restaurants related to this Merchant
        related_name='restaurants') 
    
    def __str__(self):
        return self.name  


class Reservation(models.Model):
    reservID = models.AutoField(primary_key=True)
    reserved_at = models.DateTimeField()
    pax = models.IntegerField()
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE,
        related_name='reservations')
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'},
        related_name='reservations')
    
    def __str__(self):
        return f"Reservation {self.reservID} by {self.customer.get_username()} at {self.restaurant.name}"
    

class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    reviewed_at = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        default=0)
    description = models.CharField(max_length=255, blank=True)
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE,
        related_name='reviews')
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'},
        related_name='reviews')
    
    def save(self, *args, **kawrgs):
        super(Review, self).save(*args, **kawrgs)
        self.restaurant.avg_rating = Review.objects.filter(restaurant=self.restaurant).aggregate(Avg('rating'))["rating__avg"]
        self.restaurant.save()

    def delete(self, *args, **kawrgs):
        new_avg = Review.objects.filter(restaurant=self.restaurant).filter(~Q(review_id=self.review_id)).aggregate(Avg('rating'))["rating__avg"]
        self.restaurant.avg_rating = new_avg if new_avg else 0
        self.restaurant.save()
        super(Review, self).delete(*args, **kawrgs)
    
    def __str__(self):
        return f"Review {self.review_id} by {self.customer.get_username()} at {self.restaurant.name}"
    