from django.contrib import admin
from message.models import Message, Chat, ChatUser


class MessageInline(admin.StackedInline):

    model = Message


class ChatUserInline(admin.StackedInline):

    model = ChatUser


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):

    inlines = ChatUserInline, MessageInline
