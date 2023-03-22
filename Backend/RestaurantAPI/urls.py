from django.urls import path
from .views import restaurants, reservations, reviews, recommendations


urlpatterns = [
   path('restaurants', restaurants.RestaurantsView.as_view()),
   path('restaurants/<int:resID>', restaurants.SingleRestaurantView.as_view()),
   path('restaurants/recommendations', recommendations.RestaurantRecommendationsView.as_view()),
   path('restaurants/search', recommendations.SearchRestaurantsView.as_view(), name='searchRestaurants'),
   path('restaurants/<int:resID>/reservations', reservations.ReservationsView.as_view()),
   path('restaurants/<int:resID>/reservations/<int:reservID>', reservations.SingleReservationView.as_view()),
   path('restaurants/<int:resID>/reviews', reviews.ReviewsView.as_view()),
   path('restaurants/<int:resID>/reviews/<int:review_id>', reviews.SingleReviewView.as_view()),
]
