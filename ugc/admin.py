from django.contrib import admin
from ugc.models import Post, Comment
from like.admin import LikesInline

class CommentInLine(admin.TabularInline):

    model = Comment
    extra=1


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):

    inlines = CommentInLine, LikesInline

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):

    inlines = LikesInline,
