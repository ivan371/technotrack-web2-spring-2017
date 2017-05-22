# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from group.models import PostGroup
from django.db.models.signals import post_save, pre_save, pre_delete
from django.dispatch import receiver
from adjacent import Client

@receiver(post_save, sender=PostGroup)
def post_post_save(instance, created, **kwargs):
    client = Client()
    if len(instance.content) > 40:
        content = instance.content[40:] + '...'
    else:
        content = instance.content
    client.publish("user{}".format(instance.group.author_id),
        {
            "msg":
                '<p>Новое оповещение в группе </p> <h4><a href="/vk/groups/{}/">{}</a></h4><p>{}</p>'.format(instance.group.id,instance.group.name,content)
        }
    )
    for user in instance.group.groupuser_set.get_queryset():
        client.publish("user{}".format(user.author.id),
            {
                "msg":
                    '<p>Новое оповещение в группе </p> <h4><a href="/vk/groups/{}/">{}</a></h4><p>{}</p>'.format(instance.group.id,instance.group.name, content)
            }
        )
    response = client.send()
