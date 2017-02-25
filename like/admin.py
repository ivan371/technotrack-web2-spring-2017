from django.contrib import admin
from like.models import Like
from django.contrib.contenttypes.admin import GenericInlineModelAdmin

class LikesInline(admin.StackedInline, GenericInlineModelAdmin):

    model = Like
    ct_field = 'target_content_type'
    ct_fk_field = 'target_id'
    extra=1
