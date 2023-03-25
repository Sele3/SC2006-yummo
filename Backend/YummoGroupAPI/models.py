from django.db import models
from django.contrib.auth.models import User, Group
from django.core.exceptions import ObjectDoesNotExist, BadRequest
from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from djoser.signals import user_registered


class BaseProfile(models.Model):
    bio = models.TextField(max_length=500, blank=True)
    contact_no = models.CharField(max_length=20, blank=True, null=True)
    icon = models.ImageField(upload_to='images/', default=None, null=True, blank=True)

    class Meta:
        abstract = True


#Wrap User model by attaching a CustomerProfile to each User (Customer)
class CustomerProfile(BaseProfile):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Customers'},
        related_name='customerprofile')
    friends = models.ManyToManyField(
        User,
        limit_choices_to={'groups__name': 'Customers'},
        related_name='friends',
        blank=True)
    
    def __str__(self):
        return f"{self.user.get_username()}'s CustomerProfile"
    

#Wrap User model by attaching a MerchantProfile to each User (Merchant)    
class MerchantProfile(BaseProfile):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Merchants'},
        related_name='merchantprofile')
    
    def __str__(self):
        return f"{self.user.get_username()}'s MerchantProfile"


@receiver(user_registered)
def assign_group(sender, user, request, **kwargs):

    group_name = request.data.get("group_name")
 
    if group_name:
        try:
            group = Group.objects.get(name=group_name)
            user.groups.add(group)
        except ObjectDoesNotExist:
            user.delete()
            raise BadRequest({'detail' : 'Please enter a valid Group name'})

        
    
        


#create a Customer/Merchant profile when User are added to either Group
#delete the profile when User are removed from the Group
@receiver(signal=m2m_changed, sender=User.groups.through)
def user_added_or_removed_from_group(sender, instance, action, model, **kwargs):
    isMerchant = instance.groups.filter(name="Merchants").exists()
    isCustomer = instance.groups.filter(name="Customers").exists()
    if action == "post_add": 
        if isCustomer:
            CustomerProfile.objects.create(user=instance)
        elif isMerchant:
            MerchantProfile.objects.create(user=instance)
    if action == "pre_remove":
        if isCustomer:
            instance.customerprofile.delete()
        if isMerchant:
            instance.merchantprofile.delete()
        
        
#signal to save the Customer/Merchant Profile after the Customer/Merchant is updated
@receiver(post_save, sender = User)
def save_user_profile(sender, instance, **kwargs):
    if instance.groups.filter(name="Customers").exists(): #Customer updated
            instance.customerprofile.save()
    elif instance.groups.filter(name="Merchants").exists(): #Merchant updated
            instance.merchantprofile.save()



class YummoGroup(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.ImageField(upload_to='images/', default=None, null=True, blank=True)
    owner = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        limit_choices_to={'groups__name': 'Customers'},
        related_name='owners')
    customers = models.ManyToManyField(
        User, 
        limit_choices_to={'groups__name': 'Customers'},
        #calling user.yummogroups will return the YummoGroup related to this User
        related_name='yummogroups',
        blank=True)
    
    def __str__(self):
        return self.name
    

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    img = models.ImageField(upload_to='images/', default=None, null=True, blank=True)
    description = models.TextField(blank=True)
    posted_at = models.DateTimeField(auto_now=True)
    customer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        limit_choices_to={'groups__name': 'Customers'},
        related_name='posts')
    group = models.ForeignKey(
        YummoGroup, 
        on_delete=models.CASCADE,
        related_name='posts')
    
    def __str__(self):
        return f"Post {self.post_id} by {self.customer.get_username()} in {self.group.name} group"      
    

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    commented_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='comments')
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE,
        related_name='comments')
    
    def __str__(self):
        return f"Comment {self.comment_id} by {self.user.get_username()} on Post {self.post.post_id} in {self.post.group.name} group"
    