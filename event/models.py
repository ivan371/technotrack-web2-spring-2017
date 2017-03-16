from __future__ import unicode_literals
from core.models import Authored, Dated

from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class Event(Authored, Dated): #mix in Publication,  draw himself. render title/contnet in all models
    target_content_type = models.ForeignKey(ContentType)
    target_id = models.PositiveIntegerField()
    target = GenericForeignKey('target_content_type', 'target_id')
    EVENT_CHOISE = (
        (1, 'create'),
        (2, 'delete'),
    )
    EVENT_TYPE = (
        (1, 'post'),
        (2, 'comment'),
        (3, 'like'),
    )
    value = models.CharField(max_length=2, choices=EVENT_CHOISE, default=1)
    {'create':1, 'delete': 2}
    event_type = models.CharField(max_length=2, choices=EVENT_TYPE, default=1)
    {'post': 1, 'comment': 2, 'like': 3}


class Eventable(models.Model):
    event = GenericRelation(
        Event,
        content_type_field='target_content_type',
        object_id_field ='target_id'
    )
    class Meta:
        abstract = True
