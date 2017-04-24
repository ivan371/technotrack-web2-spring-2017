from templated_email import send_templated_mail
from django.conf import setting

def send_mail(subject, content, from_email, recipient_list, attachments=[]):

    if setting.DEBUG:
        recipient_list = [admin[0] for admin in setting.ADMIN]
