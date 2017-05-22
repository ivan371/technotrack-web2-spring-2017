from __future__ import unicode_literals
from core.models import User, Authored
from event.models import Eventable
from like.models import Likeable
from django.db import models
from ugc.models import Notable, Commentable

class Groupp(Authored, Eventable):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class GroupUser(models.Model):
    group = models.ForeignKey(Groupp)
    author = models.ForeignKey(User)

class PostGroup(Notable):
    group = models.ForeignKey(Groupp)
    
class CommentGroup(Commentable):
    post = models.ForeignKey(PostGroup)