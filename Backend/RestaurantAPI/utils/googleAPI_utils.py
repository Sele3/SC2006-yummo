from Yummo.settings import GOOGLE_API_KEY
from rest_framework.exceptions import ParseError, ValidationError
import requests, math
from ..models import Restaurant
from .. import serializers

"""
search API need price Range attribute, rating, lat, lng, photo, cuisine
"""
FORMAT = "json" #accepts json or xml


# Google's Geocoding API
def getGeocode(address:str):
    #get the human-readable address string from request
    if not address:
        raise ParseError(detail="'address' field is required", code=400)
    address = address.replace('#','') #Clean input: cannot pass '#' into the address query
    
    #Using Geocoding API, convert address to latitude & longtitude coordinates
    url = f"https://maps.googleapis.com/maps/api/geocode/{FORMAT}?address={address}&key={GOOGLE_API_KEY}"
    
    geocode = requests.get(url)
    return geocode.json()

# Google's Places Search API
def searchGoogleRestaurants(request, location):
    lat = location["lat"]
    lng = location["lng"]
    
    #Using Places API - nearby search, find nearby restaurants with filter
    TYPE = "restaurant" #fixed
    radius = "&radius=1500" #in metres, DEFAULT set to 1500
    if request.data.get("radius"):
        radius = "&radius=" + str(request.data.get("radius"))
    
    #optional parameters
    keyword = rankby = price = ""
    
    if request.data.get("keyword"):
        keyword = "&keyword=" + request.data.get("keyword")
        
    if request.data.get("price"):
        price = "&maxprice={0}".format(int(request.data.get("price"))-1)

    if request.data.get("sort_by") == 'DISTANCE': #two possible values: distance or prominence (default)

        rankby = "&rankby=distance" 
        radius = "" #sets radius to empty string as rankby cannot be used in conjunction with radius

    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/{FORMAT}?location={lat}%2C{lng}{radius}{keyword}{price}{rankby}&type={TYPE}&key={GOOGLE_API_KEY}"
    restaurants = requests.get(url)
    return restaurants.json()


# Google's Places Detail API
def getPlaceDetail(placeID):
    """Additional fields needed from Google Restaurant
    formatted_address, 
    formatted_phone_number,
    """
    parameters = "formatted_address,formatted_phone_number"
    
    url = f"https://maps.googleapis.com/maps/api/place/details/{FORMAT}?place_id={placeID}&fields={parameters}&key={GOOGLE_API_KEY}"
    
    restaurant = requests.get(url)
    return restaurant.json()


def updateAdditionalGoogleRestaurantsDetail(googleRestaurants_json):
    
    # Check status of returned response. Returns empty list is there's no nearby restaurants found.
    if googleRestaurants_json.get('status') != "OK":
        return []
    
    googleRestaurants_list = googleRestaurants_json.get('results') 
    # Retrieve a list of the PlaceID
    placeID_list = []
    for place in googleRestaurants_list:
        placeID_list.append(place.get("place_id"))
        

        
    # Get the additional details required and add it into the existing results
    for idx, placeID in enumerate(placeID_list):
        additionalDetail = getPlaceDetail(placeID)
        if additionalDetail.get("status") == "OK":
            googleRestaurants_list[idx].update(additionalDetail.get('result'))
    
    return googleRestaurants_list


    

# Convert a list of GoogleRestaurants into the format of YummoRestaurant.
def formatGoogleRestaurant(googleRestaurants_jsonlist):
    """fields from Google Restaurant
    name, 
    formatted_address, 
    formatted_phone_number, 
    photos, 
    rating,
    price_level, 
    geometry: location :{lat,lng} 
    """
    for idx, restaurant in enumerate(googleRestaurants_jsonlist):

        googleRestaurants_jsonlist[idx] = {
            "resID" : 0,
            "name" : restaurant.get("name"),
            "address": restaurant.get("formatted_address", "Address unavailable"),
            "contact_no" : restaurant.get("formatted_phone_number", "Contact Number unavailable"),
            "img" : restaurant.get("photos")[0].get("photo_reference") if restaurant.get("photos", None) else None,
            "cuisine" : [],
            "avg_rating" : restaurant.get("rating"),
            "price" : int(restaurant.get("price_level",2)) + 1, #Google's price range from 0 to 4
            "merchant" : 0,
            "merchant_name" : None,
            "location" : restaurant.get("geometry").get("location")
        }
        
   # For Debugging
    print("\nGoogle Restaurants List")
    for idx, res in enumerate(googleRestaurants_jsonlist):
        print("Google Restaurant: {}".format(res.get('name')))
        
    return googleRestaurants_jsonlist
        

    


def searchYummoRestaurants(request, location):
    '''
    filter by price, 
    then filtered by cuisine,
    then filtered by within radius. If rankby=='distance', radius will be ignored.
    '''
    restaurants = Restaurant.objects.all()
    
    price = request.data.get("price")
    keyword = request.data.get("keyword")
    radius = request.data.get("radius",1500) #in metres, DEFAULT set to 1500
    rankby = request.data.get("sort_by")
    
    if price:
        restaurants = restaurants.filter(price__lte=price)
        print("\nAfter Price filter",restaurants, "\n")

    if keyword:
        restaurants = restaurants.filter(cuisine__name__icontains=keyword)
        print("\nAfter Cuisine filter",restaurants, "\n")
        
    distanceMatrix = getDistanceMatrix(restaurants=restaurants, location=location)
        
    #order the distance by
    if rankby == 'DISTANCE':
        radius = None # rankby cannot be used in conjunction with radius
        # Default cutoff distance is 1500m.
        restaurants = filterWithinRadius(restaurants=restaurants, distanceMatrix=distanceMatrix, radius=1500)
    
    # find restaurants within radius
    if radius:
        restaurants = filterWithinRadius(restaurants=restaurants, distanceMatrix=distanceMatrix, radius=radius)
        
    
    serialized_restaurants = serializers.RestaurantSerializer(restaurants, many=True)
    
    return serialized_restaurants.data




# Use Distance Matrix API to get the 
def getDistanceMatrix(restaurants, location):
    
    # Empty queryset
    if not restaurants.exists():
        return restaurants
    
    origin = f"{location.get('lat')},{location.get('lng')}"
    
    # Format into a string of lat,lng from each restaurant
    destinations = ""
    for restaurant in restaurants:
        destinations += f"{restaurant.lat},{restaurant.lng}|"
    
    destinations = destinations.strip('|')
    
    url = f"https://maps.googleapis.com/maps/api/distancematrix/{FORMAT}?origins={origin}&destinations={destinations}&mode=walking&key={GOOGLE_API_KEY}"

    distance_matrix = requests.get(url)
    print("\n", distance_matrix.json(), "\n")
    return distance_matrix.json()


def filterWithinRadius(restaurants, distanceMatrix, radius):
    # Empty queryset
    if not restaurants.exists():
        return restaurants
    
    distance_list = distanceMatrix.get('rows')[0].get('elements')
    for idx, restaurant in enumerate(restaurants.all()):
        # exclude restaurant outside radius
        if distance_list[idx].get('status') != 'OK' or distance_list[idx].get('distance').get('value') > int(radius):
            restaurants = restaurants.exclude(resID=restaurant.resID)
    
    return restaurants




def sortByRating(yummo_restaurants, rating):
    
    if rating == "ASC":
        reverse = False
    elif rating == "DESC":
        reverse = True
    else:
        return yummo_restaurants
        
    return sorted(yummo_restaurants, key=lambda x: float(x['avg_rating']), reverse=reverse)


def sortByDistance(yummo_restaurants, location):
    
    def get_distance(location1, location2):
        lat1, lng1 = location1['lat'], location1['lng']
        lat2, lng2 = float(location2['lat']), float(location2['lng'])
        return math.sqrt((lat2-lat1)**2 + (lng2-lng1)**2)
    
    return sorted(yummo_restaurants, key=lambda x: get_distance(location, x['location']), reverse=False)
    


def get_lat_lng(address: str) -> dict:
    json: dict = getGeocode(address)
    if json.get('status') != 'OK':
        raise ValidationError({'detail':f"The address '{address}' does not exist or might be uncompleted."})
    
    return json.get("results")[0].get("geometry").get("location")