from __future__ import unicode_literals

from django.db import models
from core.models import User
from event.models import Eventable

class Friend(Eventable):

    first = models.ForeignKey(User, related_name='first')
    second = models.ForeignKey(User, related_name='second')


class FriendShip(Eventable):

    iniciator = models.ForeignKey(User, related_name='iniciator')
    repliciant = models.ForeignKey(User, related_name='repliciant')
    approved = models.BooleanField()
