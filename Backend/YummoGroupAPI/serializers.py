from .models import CustomerProfile, MerchantProfile, YummoGroup, Post, Comment
from django.contrib.auth.models import User
from rest_framework import serializers


# Gets only the basic information of a user
class UserBasicInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username']


# Gets full information of the user
class UserFullInfoSerializer(UserBasicInfoSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']    


class FriendSerializer(serializers.ModelSerializer):
    friends = UserBasicInfoSerializer(many=True, read_only=True)

    class Meta:
        model = CustomerProfile
        fields = ['friends']


class CustomerProfileSerializer(serializers.ModelSerializer):
    user = UserFullInfoSerializer()
    #friends = UserBasicInfoSerializer(many=True, read_only=True)

    class Meta:
        model = CustomerProfile
        fields = ['user', 'bio', 'contact_no']
    
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user_serializer = UserFullInfoSerializer(instance.user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        return super().update(instance, validated_data)

    
        

class MerchantProfileSerializer(serializers.ModelSerializer):
    user = UserFullInfoSerializer()
    #restaurants = serializers.SerializerMethodField()

    class Meta:
        model = MerchantProfile
        fields = ['user', 'bio', 'contact_no']#, 'restaurants']

    # def get_restaurants(self, obj):
    #     restaurant_list = Restaurant.objects.filter(merchant=obj.user)
    #     return RestaurantSerializer(restaurant_list, many=True).data

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user_serializer = UserFullInfoSerializer(instance.user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()
        return super().update(instance, validated_data)

        
# Old Serializer
# class MerchantProfileSerializer(serializers.ModelSerializer):
#     user = UserFullInfoSerializer()

#     class Meta:
#         model = MerchantProfile
#         fields = ['user', 'bio', 'contact_no']


class YummoGroupSerializer(serializers.ModelSerializer):
    customers = UserBasicInfoSerializer(many=True, read_only=True)

    class Meta:
        model = YummoGroup
        fields = ['group_id', 'name', 'description', 'customers']
        

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['post_id', 'img', 'description', 'posted_at', 'customer']
        extra_kwargs ={
            'posted_at': {'read_only': True}
        }
        

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['comment_id', 'content', 'commented_at', 'user', 'post']
        extra_kwargs ={
            'commented_at': {'read_only': True}
        }
        