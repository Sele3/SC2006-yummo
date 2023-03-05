from django.urls import path
from . import views

urlpatterns = [
    path("users/profile", views.profileView),
    path("users/friends", views.friendsView),
    path("users/friends/<str:username>", views.SingleFriendView.as_view()),
]
