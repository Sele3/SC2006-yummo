from django.contrib import admin
from .models import Restaurant, Reservation, Review, YummoGroup, Post, Comment

admin.site.register(Restaurant)
admin.site.register(Reservation)
admin.site.register(Review)
admin.site.register(YummoGroup)
admin.site.register(Post)
admin.site.register(Comment)
