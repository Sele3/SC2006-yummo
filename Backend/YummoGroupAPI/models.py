from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


#Extend User model by attaching a Profile to each User
class Profile(models.Model):
    user = models.OneToOneField(User, 
                                on_delete=models.CASCADE,
                                related_name='profile')
    bio = models.TextField(max_length=500, blank=True)
    contact_no = models.CharField(max_length=20, blank=True, null=True)
    friends = models.ManyToManyField(User,
                                     limit_choices_to={'groups__name': 'Customers'},
                                     related_name='friends',
                                     blank=True
                                     )
    def __str__(self):
        return "{}'s profile".format(self.user.get_username())
@receiver(post_save, sender = User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender = User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class YummoGroup(models.Model):
    group_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    customers = models.ManyToManyField(
        User, 
        limit_choices_to={'groups__name': 'Customers'},
        related_name='yummogroups' #calling user.yummogroups will return the YummoGroup related to this User
        )
    
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
        related_name='posts'
        )
    group = models.ForeignKey(
        YummoGroup, 
        on_delete=models.CASCADE,
        related_name='posts'
        )
    
    def __str__(self):
        return "Post {} by {} in {} group".format(self.post_id, self.customer.get_username(), self.group.name)        
    
    

class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    commented_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
        related_name='comments'
        )
    post = models.ForeignKey(
        Post, 
        on_delete=models.CASCADE,
        related_name='comments'        
        )
    
    def __str__(self):
        return "Comment {} by {} on Post {} in {} group".format(self.comment_id, self.user.get_username(), self.post.post_id, self.post.group.name)
    
