from Yummo.settings import GOOGLE_API_KEY
from rest_framework.exceptions import ParseError
import requests


"""
search API need price Range attribute, rating, lat, lng, photo, cuisine
"""
FORMAT = "json" #accepts json or xml

def getGeocode(address:str):
    #get the human-readable address string from request
    if not address:
        raise ParseError(detail="'address' field is required", code=400)
    address = address.replace('#','') #Clean input: cannot pass '#' into the address query
    
    #Using Geocoding API, convert address to latitude & longtitude coordinates
    url = f"https://maps.googleapis.com/maps/api/geocode/{FORMAT}?address={address}&key={GOOGLE_API_KEY}"
    
    geocode = requests.get(url)
    #print(geocode.json())
    return geocode.json()


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


def get_lat_lng(address: str) -> dict:
    json: dict = getGeocode(address)
    return json.get("results")[0].get("geometry").get("location")
    

# Convert a list of GoogleRestaurants into the format of YummoRestaurant.
def formatGoogleRestaurant(googleRestaurants_json):
    pass

# Use Distance Matrix API to get the 
def getDistanceMatrix(request):
    pass


def searchYummoRestaurants():
    pass
