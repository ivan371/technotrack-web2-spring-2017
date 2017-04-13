from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated, User
from event.models import Eventable

class Chat(Authored, Dated, Eventable):

    name = models.CharField(max_length=100)

class ChatUser(models.Model):

    user = models.ForeignKey(User)
    chat = models.ForeignKey(Chat)

class Message(Authored, Dated, Eventable):

    content = models.CharField(max_length=255)
    chat = models.ForeignKey(Chat)
