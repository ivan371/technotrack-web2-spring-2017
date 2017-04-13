from __future__ import unicode_literals

from core.models import Authored, Dated
from event.models import Eventable
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class Like(Authored, Dated, Eventable):

    power = models.IntegerField()
    target_content_type = models.ForeignKey(ContentType)
    target_id = models.PositiveIntegerField()
    target = GenericForeignKey('target_content_type', 'target_id')

    def __unicode__(self):
        return u'Likes'.format(self.power)

class Likeable(models.Model):
    likes = GenericRelation(
        Like,
        content_type_field='target_content_type',
        object_id_field ='target_id',
        related_name='like'
    )
    like_count = models.IntegerField(default=0)
    class Meta:
        abstract = True
