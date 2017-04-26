#coding: utf-8
from templated_email import get_templated_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

def send_mail(from_email, recipient_list, code):

    # if settings.DEBUG:
    #     recipient_list = [admin[0] for admin in settings.ADMIN]
    # print("asdfsadfsdfsdfdsf")

    email = get_templated_mail(
        'activation',
        {'code': code},
        from_email,
        [recipient_list],
    )
    email.send()
