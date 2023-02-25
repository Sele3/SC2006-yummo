from django.contrib import admin
from YummoGroupAPI.models import YummoGroup, Post, Comment


@admin.register(YummoGroup)
class YummoGroupAdmin(admin.ModelAdmin):
    list_display = ['group_id', 'name', 'description']


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['post_id', 'posted_at', 'customer', 'group']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display=['comment_id', 'commented_at', 'user', 'post']
  