from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated
from like.models import Likeable
from event.models import Eventable


class Notable(Authored, Dated, Likeable, Eventable):
    title = models.CharField(max_length=255, verbose_name="post_title")
    content = models.TextField(verbose_name="post_content")
    comment_count = models.IntegerField(default=0)
    short_content = models.TextField()
    
    def get_title(self):
        return self.title[:5]
    
    @models.permalink
    def get_absolute_url(self):
        return 'ugc:post_detail', (), {'pk': self.pk}
    
    def __str__(self):
        return self.title


    class Meta:
        abstract = True


class Commentable(Authored, Dated, Likeable, Eventable):
    text = models.TextField()
    
    def __str__(self):
        return self.text[:20]
    class Meta:
        abstract = True


class Post(Notable):
    pass

class Comment(Commentable):
	post = models.ForeignKey(Post)


