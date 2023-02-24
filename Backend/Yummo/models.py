from django.db import models
from django.contrib.auth.models import User


class Restaurant(models.Model):
    resID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    avg_rating = models.FloatField(default=0.0)
    merchant = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Merchants'})


class Reservation(models.Model):
    reservID = models.AutoField(primary_key=True)
    reserved_at = models.DateTimeField()
    pax = models.IntegerField()
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE)
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'})
    

class Review(models.Model):
    review_id = models.AutoField(primary_key=True)
    rating = models.IntegerField(
        choices=[(i, str(i)) for i in range(1, 6)],
        default=0)
    description = models.CharField(max_length=255)
    restaurant = models.ForeignKey(
        Restaurant, 
        on_delete=models.CASCADE)
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'})


class YummoGroup(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    customers = models.ManyToManyField(
        User, 
        limit_choices_to={'groups__name': 'Customers'})
    

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='images/', default=None)
    posted_at = models.DateTimeField()
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Customers'})
    group = models.ForeignKey(
        YummoGroup, 
        on_delete=models.CASCADE)
    

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    commented_at = models.DateTimeField()
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE)
