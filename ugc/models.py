from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated
from like.models import Likeable
from event.models import Eventable

class Post(Authored, Dated, Likeable, Eventable):

	title = models.CharField(max_length=255, verbose_name="post_title")
	content = models.TextField(verbose_name="post_content")
	comment_count = models.IntegerField(default=0)
	short_content = models.TextField()

	def get_title(self):
		return self.title[:5]

class Comment(Authored, Dated, Likeable, Eventable):

	post = models.ForeignKey(Post)
	text = models.TextField()
