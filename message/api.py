from message.models  import Chat, Message, ChatUser
from rest_framework import serializers, viewsets, permissions
from application.api import router
from django.shortcuts import get_object_or_404
from core.api import UserSerializer
from django.db.models import Q


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user


class MessageSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ('content', 'chat', 'author', 'id')

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(MessageViewSet, self).get_queryset()
        if 'chat' in self.request.query_params:
            queryset = queryset.filter(chat=self.request.query_params['chat']).order_by('id')
        return queryset



class ChatUserSerializer(serializers.ModelSerializer):

    author = UserSerializer()

    class Meta:
        model = ChatUser
        fields = ('author', 'id',)

class ChatUserViewSet(viewsets.ModelViewSet):
    queryset = ChatUser.objects.all()
    serializer_class = ChatUserSerializer

    def perform_create(self, serializer):
        if 'chat' in self.request.query_params:
            chat = Chat.objects.get(id = self.request.query_params['chat'])
            serializer.save(chat=chat)

    def get_queryset(self):
        queryset = super(ChatUserViewSet, self).get_queryset()
        #ChatUser.objects.get(chat=self.request.query_params, user=self.request.user)
        if 'chat' in self.request.query_params:
            queryset = queryset.filter(chat=self.request.query_params['chat'])
        return queryset

class UserChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatUser
        fields = ('author_id', 'chat_id')

class UserChatViewSet(viewsets.ModelViewSet):
    queryset = ChatUser.objects.all()
    serializer_class = UserChatSerializer

class ChatSerializer(serializers.ModelSerializer):

    chatuser_set = ChatUserSerializer(many=True, read_only=True)
    message_set = MessageSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    class Meta:
        model = Chat
        fields = ('name', 'chatuser_set', 'id', 'message_set', 'author')

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(ChatViewSet, self).get_queryset()
        return queryset.filter(Q(chatuser__author=self.request.user) | Q(author=self.request.user)).distinct().order_by('id')


router.register(r'chats', ChatViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'chatuser', UserChatViewSet)
