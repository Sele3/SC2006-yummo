from Yummo.settings import TRIPADVISOR_API_KEY, TRIPADVISOR_API_HOST
import requests

#trip advisor API calls
def searchLocation(location):
    url = "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation"

    querystring = {"query":location}

    headers = {
    "X-RapidAPI-Key": TRIPADVISOR_API_KEY,
    "X-RapidAPI-Host": TRIPADVISOR_API_HOST
    }
    
    response = requests.request("GET", url, headers=headers, params=querystring)
    return response

def getLocationId(location):
    try:
        ans = searchLocation(location)
        ans = (ans.json())
        return ans['data'][0]['locationId']
    except: #location not found
        return -1

def getRestaurants(locationId):
  url = "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants"

  querystring = {"locationId":locationId}

  headers = {
    "X-RapidAPI-Key": TRIPADVISOR_API_KEY,
    "X-RapidAPI-Host": TRIPADVISOR_API_HOST
  }

  response = requests.request("GET", url, headers=headers, params=querystring)

  return response.json()
  

def getRestaurantDetails(restaurantId):
  url = "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/getRestaurantDetails"

  querystring = {"restaurantsId":restaurantId,"currencyCode":"SGD"}

  headers = {
    "X-RapidAPI-Key": TRIPADVISOR_API_KEY,
    "X-RapidAPI-Host": TRIPADVISOR_API_HOST
  }

  response = requests.request("GET", url, headers=headers, params=querystring)

  return response.json()
