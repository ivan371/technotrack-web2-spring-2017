from __future__ import unicode_literals

from django.apps import AppConfig


class FriendConfig(AppConfig):
    name = 'friend'

    def ready(self):
        import api
