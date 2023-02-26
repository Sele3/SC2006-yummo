#Put your utility functions here

MERCHANT = "Merchants"
CUSTOMER = "Customers"

#check if User is a Merchant
def isMerchantGroup(request):
    return request.user.groups.filter(name=MERCHANT).exists()
#check if User is a Customer
def isCustomerGroup(request):
    return request.user.groups.filter(name=CUSTOMER).exists()