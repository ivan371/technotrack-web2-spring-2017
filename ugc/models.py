from __future__ import unicode_literals

from django.db import models
from core.models import Authored, Dated


class Post(Authored, Dated):

	title = models.CharField(max_length=255)
	content = models.CharField(max_length=2047)

	def get_title(self):
		return self.title
