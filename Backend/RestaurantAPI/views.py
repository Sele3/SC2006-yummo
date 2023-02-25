from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from decimal import Decimal
from django.contrib.auth.models import User, Group
from .models import Restaurant, Reservation, Review
from .serializers import RestaurantSerializer
from django.core.paginator import Paginator, EmptyPage
import datetime
# Create your views here.

@api_view()
def testview(request, resID, reservID):
    
    data = {'resID':resID,
            'reservID': reservID}
    return Response(data)
