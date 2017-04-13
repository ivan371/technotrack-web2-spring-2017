from ugc.models import Post
from like.models import Like, Likeable
from django.db.models.signals import post_save, pre_save, pre_delete
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q

def recount_rating(num, post):
    if post.like_count >= num:
        u = post.author
        u.rating = (num/10)*Post.objects.filter(
            Q(author=u) & Q(like_count__gte=num)).count()
        u.save()

def recount_likes_on_post(instance, created = False, *args, **kwargs):

     if created:
        instance.target.like_count = Like.objects.filter(target_id = instance.target_id).count()
        instance.target.save()
        recount_rating(10, instance.target)
        recount_rating(100, instance.target)
        recount_rating(1000, instance.target)

def delete_like(instance, *args, **kwargs):

    l = Like.objects.filter(target_id=instance.id)#contenttypes or instance.likes.all
    for lke in l:
        lke.delete()

post_save.connect(recount_likes_on_post, sender=Like)
for model in Likeable.__subclasses__():
    pre_delete.connect(delete_like, sender=model)
