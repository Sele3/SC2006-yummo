from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from ..models import Restaurant, Review
from ..serializers import ReviewSerializer
from drf_yasg.utils import swagger_auto_schema
from Yummo.utilityfunctions import IsCustomer, AuthenticatedViewClass



class ReviewsView(AuthenticatedViewClass):
    
    @swagger_auto_schema(operation_description='''Get list of all `Review` under this Restaurant.
                         \nAuthorization: `AllowAny`
                         ''',
                         tags=['reviews'], 
                         responses={200: ReviewSerializer(many=True), 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})  
    def get(self, request, resID):
        restaurant = get_object_or_404(Restaurant, pk=resID)
        reviews = restaurant.reviews
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)
    
    
    @swagger_auto_schema(operation_description='''Create a `Review` under the current Customer for the Restaurant specified by `resID`.                         
                         \nAuthorization: `Customer`
                         ''',
                         tags=['reviews'], 
                         request_body=ReviewSerializer,
                         responses={201: ReviewSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"}) 
    def post(self, request, resID):
        data = request.data.copy()
        data['restaurant']= resID
        data['customer']= request.user.id
        serialized_review = ReviewSerializer(data=data)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data, status=status.HTTP_201_CREATED)
    
    
    # GET method does not need authentication
    # POST method requires Customer access
    def get_permissions(self):
        permission_classes = []
        if self.request.method != 'GET':
            permission_classes = super().permission_classes.copy()
            permission_classes.append(IsCustomer)
        return [permission() for permission in permission_classes]
    
    

class SingleReviewView(AuthenticatedViewClass):
    
    @swagger_auto_schema(operation_description='''Get information of a `Review` about this Restaurant.
                         \nAuthorization: `AllowAny`
                         ''',
                         tags=['reviews'], 
                         responses={200: ReviewSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def get(self, request, resID, review_id):
        review = get_object_or_404(Review,pk=review_id, restaurant=resID)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data, status=status.HTTP_200_OK)
    
    
    @swagger_auto_schema(operation_description='''Update information of a `Review` about this Restaurant if current Customer made the `Review`.
                         \nAuthorization: `Customer`
                         ''',
                         tags=['reviews'], 
                         request_body=ReviewSerializer,
                         responses={200: ReviewSerializer, 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def put(self, request, resID, review_id):
        review = get_object_or_404(Review, pk=review_id, customer=request.user.id)
        restaurant = get_object_or_404(Restaurant, pk=resID)
        if resID != review.restaurant.resID:
            return Response({"message":"The review requested does not belong to {}".format(restaurant.name)}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data.copy()
        #Only rating and description can be changed
        data['restaurant'] = review.restaurant.resID
        data['customer'] = review.customer.id
        serialized_review = ReviewSerializer(review, data=data, partial=True)
        serialized_review.is_valid(raise_exception=True)
        serialized_review.save()
        return Response(serialized_review.data, status=status.HTTP_200_OK)
    
    
    @swagger_auto_schema(operation_description=
                         '''Delete a `Review` about this Restaurant if current Customer made the `Review`.
                         \nAuthorization: `Customer`
                         ''',
                         tags=['reviews'], 
                         responses={200: 'OK', 400: "Bad Request", 403: "Forbidden", 404: "Not Found"})
    def delete(self, request, resID, review_id):
        review = get_object_or_404(Review,pk=review_id, customer=request.user.id, restaurant=resID)
        review.delete()
        return Response({"message":"Review deleted"}, status=status.HTTP_200_OK)
    
    
    # GET method does not need authentication
    # PUT, DELETE method requires Customers access
    def get_permissions(self):
        permission_classes = []
        if self.request.method != 'GET':
            permission_classes = super().permission_classes.copy()
            permission_classes.append(IsCustomer)
        return [permission() for permission in permission_classes]

   
    