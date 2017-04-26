# coding: utf-8

from celery import task
from .helpers import send_mail

@task(bind=True)
def send_activation_email(self, from_email, recipient_list, code, time=60):
    try:
        send_mail(from_email, recipient_list, code)
    except Exception as exc:
        time *= 2
        raise self.retry(exc=exc, countdown=time)
