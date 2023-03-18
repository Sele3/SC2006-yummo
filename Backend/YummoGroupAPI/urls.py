from django.urls import path
from .views.profile import ProfileView
from .views.friends import FriendsView, SingleFriendView
from .views.groups import SingleCustomerYummoGroups, YummoGroupsView, SingleYummoGroupView
from .views.posts import YummoGroupPostsView, YummoGroupSinglePostView

urlpatterns = [
    path("users/profile", ProfileView.as_view()),
    path("users/friends", FriendsView.as_view()),
    path("users/friends/<str:username>", SingleFriendView.as_view()),
    path("user/yummogroups", SingleCustomerYummoGroups.as_view()),
    path("yummogroups", YummoGroupsView.as_view()),
    path("yummogroups/<int:grpID>", SingleYummoGroupView.as_view()),
    path("yummogroups/<int:grpID>/posts", YummoGroupPostsView.as_view()),
    path("yummogroups/<int:grpID>/posts/<int:postID>", YummoGroupSinglePostView.as_view()),
]
