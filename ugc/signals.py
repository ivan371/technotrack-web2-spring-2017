# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from ugc.models import Comment, Post
from django.db.models.signals import post_save, pre_save, pre_delete
from django.dispatch import receiver
from adjacent import Client

def recount_comments_on_post(instance, created=False, *args, **kwargs):

    instance.short_content = instance.content[:100]
    if created:
        instance.post.comment_count = Comment.objects.filter(post=instance.post).count()
        instance.post.save()

def delete_comments(instance, *args, **kwargs):

    for c in instance.comment_set.all():
        c.delete()

@receiver(post_save, sender=Post)
def post_post_save(instance, created, **kwargs):
    client = Client()
    if len(instance.content) > 40:
        content = instance.content[40:] + '...'
    else:
        content = instance.content
    client.publish("news", {"msg": '<h4><a href="/vk/people/{}/">{}</a> Изменил пост </h4> {}'.format(instance.author.id, instance.author.username, content)})

    response = client.send()

post_save.connect(recount_comments_on_post, sender=Comment)
pre_delete.connect(delete_comments, sender=Post)
