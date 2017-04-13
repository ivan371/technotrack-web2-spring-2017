from event.models import Eventable, Event
from django.db.models.signals import pre_save, pre_delete, post_init, post_save
from django.contrib.contenttypes.models import ContentType

def event_delete(instance, *args, **kwargs):
    e = Event(
        author_id=instance.author_id,
        target_id=instance.pk,
        target_content_type=ContentType.objects.get_for_model(instance),
        value=2
        )
    e.save()

def event_create(instance, created=None, *args, **kwargs):
    if created:
        e = Event(
            author_id=instance.author_id,
            target_id=instance.pk,
            target_content_type=ContentType.objects.get_for_model(instance),
            value=1
            )
        e.save()

for model in Eventable.__subclasses__():
    post_save.connect(event_create, sender=model, dispatch_uid=None)
    #pre_delete.connect(event_delete, sender=model, dispatch_uid=None)
