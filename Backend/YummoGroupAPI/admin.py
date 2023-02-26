from django.contrib import admin
from django.contrib.auth.models import User
from YummoGroupAPI.models import YummoGroup, Post, Comment, CustomerProfile, MerchantProfile


@admin.register(YummoGroup)
class YummoGroupAdmin(admin.ModelAdmin):
    list_display = ['group_id', 'name', 'description']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['post_id', 'posted_at', 'customer', 'group']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display=['comment_id', 'commented_at', 'user', 'post'] 


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'contact_no', 'bio']
    
    
@admin.register(MerchantProfile)
class MerchantProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'contact_no', 'bio']
    