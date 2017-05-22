from __future__ import unicode_literals

from django.apps import AppConfig


class GroupConfig(AppConfig):
    name = 'group'

    def ready(self):
        import api
        import signals