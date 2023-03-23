from Yummo.settings import GOOGLE_API_KEY
from rest_framework.exceptions import ParseError
import requests


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
    # print(geocode.json())
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
    keyword = rankby = ""
    
    if request.data.get("keyword"):
        keyword = "&keyword=" + request.data.get("keyword")

    if request.data.get("rankby") == 'distance': #two possible values: distance or prominence (default)
        rankby = "&rankby=distance" 
        radius = "" #sets radius to empty string as rankby cannot be used in conjunction with radius

    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/{FORMAT}?location={lat}%2C{lng}{radius}{keyword}{rankby}&type={TYPE}&key={GOOGLE_API_KEY}"
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
    # print(restaurant.json()) #REMOVE LATER
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
        # print("placeID is: ", placeID_list[-1]) #REMOVE LATER
        

        
    # Get the additional details required and add it into the existing results
    for idx, placeID in enumerate(placeID_list):
        additionalDetail = getPlaceDetail(placeID)
        if additionalDetail.get("status") == "OK":
            # print("additional result is,", additionalDetail.get('result'), "\n\n")
            # print("existing result is, ", googleRestaurants_list[idx], "\n\n")
            googleRestaurants_list[idx].update(additionalDetail.get('result'))
            # print("updated result is, ", googleRestaurants_list[idx], "\n\n")
    
    return googleRestaurants_list


def get_lat_lng(address: str) -> dict:
    json: dict = getGeocode(address)
    return json.get("results")[0].get("geometry").get("location")
    

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
            "address": restaurant.get("formatted_address"),
            "contact_no" : restaurant.get("formatted_phone_number"),
            "img" : restaurant.get("photos")[0].get("photo_reference") if restaurant.get("photos", None) else None,
            "cuisine" : [],
            "avg_rating" : restaurant.get("rating"),
            "price" : restaurant.get("price_level"),
            "merchant" : 0,
            "merchant_name" : None,
            "location" : restaurant.get("geometry").get("location")
        }
    return googleRestaurants_jsonlist
        

# Use Distance Matrix API to get the 
def getDistanceMatrix(request):
    pass


def searchYummoRestaurants():
    pass
