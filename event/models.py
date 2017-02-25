from __future__ import unicode_literals
from core.models import Authored, Dated

from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class Event(Authored, Dated):
    target_content_type = models.ForeignKey(ContentType)
    target_id = models.PositiveIntegerField()
    target = GenericForeignKey('target_content_type', 'target_id')
    value = {'create':1, 'delete': 2}


class Eventable(models.Model):
    event = GenericRelation(
        Event,
        content_type_field='target_content_type',
        object_id_field ='target_id'
    )
    class Meta:
        abstract = True
