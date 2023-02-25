from django.db import models
from django.contrib.auth.models import User


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
    
