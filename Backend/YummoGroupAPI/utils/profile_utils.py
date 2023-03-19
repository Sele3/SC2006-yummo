from django.shortcuts import get_object_or_404
from Yummo.utilityfunctions import isCustomerGroup, isMerchantGroup
from YummoGroupAPI.models import CustomerProfile, MerchantProfile
from YummoGroupAPI.serializers import CustomerProfileSerializer, MerchantProfileSerializer
from rest_framework.exceptions import ParseError


def getProfile(request):
    """Gets the associated profile based on the `Request`

    Args:
        request (`Request`): `Request` object

    Raises:
        ParseError: Message "Error. User belongs to neither a customer or merchant group." with status code 400 (Bad Request).

    Returns:
        Model: Either a `CustomerProfile` or `MerchantProfile` object
    """
    if isCustomerGroup(request):
        return get_object_or_404(CustomerProfile, user=request.user) 
    elif isMerchantGroup(request):
        return get_object_or_404(MerchantProfile, user=request.user) 
    raise ParseError(detail="Error. User belongs to neither a customer or merchant group.", code=400)


def getProfileSerializer(request):
    """Gets the associated profile serializer based on the `Request`

    Args:
        request (`Request`): `Request` object

    Raises:
        ParseError: Message "Error. User belongs to neither a customer or merchant group." with status code 400 (Bad Request).

    Returns:
        Serializer: Either a `CustomerProfileSerializer` or `MerchantProfileSerializer` object
    """
    if isCustomerGroup(request):
        return CustomerProfileSerializer
    elif isMerchantGroup(request):
        return MerchantProfileSerializer
    raise ParseError(detail="Error. User belongs to neither a customer or merchant group", code=400)
    