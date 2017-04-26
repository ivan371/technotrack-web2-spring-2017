from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    rating = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)
    is_verificated = models.BooleanField(default=False)
    activation_code = models.IntegerField(default=0)

    def is_activated(self):
        return self.is_verificated


class Authored(models.Model):

	author = models.ForeignKey(User)

	def get_title(self):
		raise NotImplementedError

	class Meta:
		abstract = True

class Dated(models.Model):

	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	class Meta:
		abstract = True
