# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from message.models import Message
from django.db.models.signals import post_save, pre_save, pre_delete
from django.dispatch import receiver
from adjacent import Client

@receiver(post_save, sender=Message)
def post_post_save(instance, created, **kwargs):
    client = Client()
    if len(instance.content) > 40:
        content = instance.content[40:] + '...'
    else:
        content = instance.content
    client.publish("user{}".format(instance.chat.author_id),
        {
            "msg":
                '<p>Новое сообщение от</p> <h4><a href="/vk/people/{}/">{}</a></h4><p>{}</p>'.format(instance.author.id, instance.author, content)
        }
    )
    for user in instance.chat.chatuser_set.get_queryset():
        client.publish("user{}".format(user.author.id),
            {
                "msg":
                    '<p>Новое сообщение от </p> <h4><a href="/vk/people/{}/">{}</a></h4><p>{}</p>'.format(instance.author.id, instance.author, content)
            }
        )
    # client.publish("news",
    #     {"msg":
    #         '<h4><a href="/vk/people/{}/">{}</a> Изменил пост </h4> {}'.format(
    #             instance.author.id, instance.author.username, content
    #         )
    #     }
    # )
    #
    response = client.send()
