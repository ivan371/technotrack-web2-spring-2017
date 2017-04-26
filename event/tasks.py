# coding: utf-8

from celery import task
from event.models import Event
from django.contrib.contenttypes.models import ContentType

@task(bind=True)
def create_task_event(self, author_id, pk, content_type_id, value, time=60):
    try:
        e = Event(
            author_id=author_id,
            target_id=pk,
            target_content_type_id=content_type_id,
            value=value
            )
        e.save()
    except Exception as exc:
        time *= 2
        raise self.retry(exc=exc, countdown=time)
