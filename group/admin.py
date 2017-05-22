from django.contrib import admin
from group.models import Groupp, GroupUser, PostGroup

class PostGroupInline(admin.StackedInline):

    model = PostGroup


class GroupUserInline(admin.StackedInline):

    model = GroupUser

@admin.register(Groupp)
class GroupAdmin(admin.ModelAdmin):
    pass
    inlines = GroupUserInline, PostGroupInline