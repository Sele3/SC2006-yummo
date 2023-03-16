from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.contrib.auth.models import User, Group
from django.core.paginator import Paginator, EmptyPage
from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from decimal import Decimal
from ..models import Restaurant, Reservation, Review
from ..serializers import RestaurantSerializer, ReservationSerializer, ReviewSerializer
from Yummo.utilityfunctions import isCustomerGroup, isMerchantGroup
from Yummo.settings import GOOGLE_API_KEY
import requests, random
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

