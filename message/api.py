from message.models  import Chat, Message, ChatUser
from rest_framework import serializers, viewsets, permissions
from application.api import router
from django.shortcuts import get_object_or_404


class ChatUserSerializer(serializers.HyperlinkedModelSerializer):

    chat = serializers.ReadOnlyField(source='chat_id')

    class Meta:
        model = ChatUser
        fields = ('user', 'chat', 'id',)

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



class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user


class ChatSerializer(serializers.HyperlinkedModelSerializer):

    chatuser_set = ChatUserSerializer(many=True)

    class Meta:
        model = Chat
        fields = ('url', 'name', 'chatuser_set', 'id')

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        queryset = super(ChatViewSet, self).get_queryset()
        return queryset.filter(chatuser__user=self.request.user)


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Message
        fields = ('url', 'content', 'chat', 'author')

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(MessageViewSet, self).get_queryset()
        if 'chat' in self.request.query_params:
            queryset = queryset.filter(chat=self.request.query_params['chat'])
        return queryset


router.register(r'chats', ChatViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'chatuser', ChatUserViewSet)
