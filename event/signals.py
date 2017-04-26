from event.models import Eventable, Event
from django.db.models.signals import pre_save, pre_delete, post_init, post_save
from django.contrib.contenttypes.models import ContentType
from .tasks import create_task_event

def event_create(instance, created=None, *args, **kwargs):
    if created:
        create_task_event.apply_async(
            [instance.author_id,
            instance.pk,
            ContentType.objects.get_for_model(instance).id,
            1]
        )
        # e = Event(
        #     author_id=instance.author_id,
        #     target_id=instance.pk,
        #     target_content_type=ContentType.objects.get_for_model(instance),
        #     value=1
        #     )
        # e.save()


for model in Eventable.__subclasses__():
    post_save.connect(event_create, sender=model, dispatch_uid=None)
