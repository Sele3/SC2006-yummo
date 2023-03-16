from django.urls import path
from .views import views, restaurants, reservations


urlpatterns = [
   path('restaurants', restaurants.RestaurantsView.as_view()),
   path('restaurants/<int:resID>', restaurants.SingleRestaurantView.as_view()),
   path('restaurants/recommendations', views.getRecommendationsView),
   path('restaurants/search', views.searchRestaurantsView, name='searchRestaurants'),
   path('restaurants/<int:resID>/reservations', reservations.ReservationsView.as_view()),
   path('restaurants/<int:resID>/reservations/<int:reservID>', reservations.SingleReservationView.as_view()),
   path('restaurants/<int:resID>/reviews', views.reviewsView),
   path('restaurants/<int:resID>/reviews/<int:review_id>', views.singleReviewView),
]
