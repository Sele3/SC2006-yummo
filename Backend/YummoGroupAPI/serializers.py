from .models import CustomerProfile, MerchantProfile, YummoGroup, Post, Comment
from django.contrib.auth.models import User
from rest_framework import serializers
import datetime

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields=['id', 'username']
        
        
class CustomerProfileSerializer(serializers.ModelSerializer):
    friends = UserSerializer(many=True, read_only=True)

    class Meta:
        model = CustomerProfile
        fields = ['user', 'bio', 'contact_no', 'friends']
        
        
class MerchantProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = MerchantProfile
        fields = ['user', 'bio', 'contact_no']
        
        
class YummoGroupSerializer(serializers.ModelSerializer):
    customers = UserSerializer(many=True, read_only=True)

    class Meta:
        model = YummoGroup
        fields = ['group_id', 'name', 'description', 'customers']
        

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['post_id', 'img', 'description', 'posted_at', 'customer']
        extra_kwargs ={
            'posted_at' : {'read_only':True}
        }
        

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['comment_id', 'content', 'commented_at', 'user', 'post']
        extra_kwargs ={
            'commented_at' : {'read_only':True}
        }
        