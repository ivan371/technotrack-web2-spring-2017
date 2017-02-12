from __future__ import unicode_literals

from django.db import models
from core.models import User

class Friend(models.Model):

    first = models.ForeignKey(User, related_name='first')
    second = models.ForeignKey(User, related_name='second')


class FriendShip(models.Model):

    iniciator = models.ForeignKey(User, related_name='iniciator')
    repliciant = models.ForeignKey(User, related_name='repliciant')
    approved = models.BooleanField()
