from django.contrib import admin
from message.models import Message, Chat, ChatUser

admin.site.register(Message)
admin.site.register(Chat)
admin.site.register(ChatUser)
