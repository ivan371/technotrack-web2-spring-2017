from ugc.models import Comment, Post
from django.db.models.signals import post_save, pre_save, pre_delete

def recount_comments_on_post(instance, created=False, *args, **kwargs):

    #instance.short_content = instance.content[:100]
    if created:
        instance.post.comment_count = Comment.objects.filter(post=instance.post).count()
        instance.post.save()

def delete_comments(instance, *args, **kwargs):

    for c in instance.comment_set.all():
        c.delete()

post_save.connect(recount_comments_on_post, sender=Comment)
pre_delete.connect(delete_comments, sender=Post)
