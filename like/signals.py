from ugc.models import Post
from like.models import Like, Likeable
from django.db.models.signals import post_save, pre_save, pre_delete
from django.contrib.contenttypes.models import ContentType

def recount_likes_on_post(instance, created = True, *args, **kwargs):

     if created:
        instance.target.like_count = Like.objects.filter(target_id = instance.target_id).count()
        instance.target.save()

def delete_like(instance, *args, **kwargs):

    l = Like.objects.filter(target_id=instance.id)
    for lke in l:
        lke.delete()

post_save.connect(recount_likes_on_post, sender=Like)
for model in Likeable.__subclasses__():
    pre_delete.connect(delete_like, sender=model)
