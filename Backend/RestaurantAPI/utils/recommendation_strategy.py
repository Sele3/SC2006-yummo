from abc import ABC, abstractmethod   
import math

class RestaurantRecommendationStrategy(ABC):
    
    @abstractmethod
    def recommend_restaurant(self, restaurants, location):
        pass
    

class PrioritizeRating(RestaurantRecommendationStrategy):
    
    def recommend_restaurant(self, restaurants, location):
        return sorted(restaurants, key=lambda x: float(x['avg_rating']), reverse=True)
        

class PrioritizeDistance(RestaurantRecommendationStrategy):
    
    def recommend_restaurant(self, restaurants, location):
        def get_distance(location1, location2):
            lat1, lng1 = location1['lat'], location1['lng']
            lat2, lng2 = float(location2['lat']), float(location2['lng'])
            return math.sqrt((lat2-lat1)**2 + (lng2-lng1)**2)
    
        return sorted(restaurants, key=lambda x: get_distance(location, x['location']), reverse=False)
    
    
class PrioritizeYummo(RestaurantRecommendationStrategy):
    
    def recommend_restaurant(self, restaurants, location):
        return restaurants
    
    
def get_recommendation_strategy(request) -> RestaurantRecommendationStrategy:
    sort_by = request.data.get('sort_by')
    if sort_by == 'YUMMO':
        return PrioritizeYummo()
    elif sort_by == 'DISTANCE':
        return PrioritizeDistance()
    elif sort_by == 'RATING':
        return PrioritizeRating()
    
    return PrioritizeYummo()