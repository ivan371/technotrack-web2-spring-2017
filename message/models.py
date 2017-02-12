from __future__ import unicode_literals

from django.db import models
from core.models import Authored
from core.models import Dated


class Chat(models.Model):

    name = models.CharField(max_length=100)

class ChatUser(Authored, Dated):

    chat = models.ForeignKey(Chat)

class Message(Authored, Dated):

    content = models.CharField(max_length=255)
    chat = models.ForeignKey(Chat)
