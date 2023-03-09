from django.urls import path
from YummoGroupAPI.views import *

urlpatterns = [
    path("users/profile", ProfileView.as_view()),
    path("users/friends", FriendsView.as_view()),
    path("users/friends/<str:username>", SingleFriendView.as_view()),
    path("user/yummogroups", SingleCustomerYummoGroups.as_view()),
]
