from event.models  import Event
from rest_framework import serializers, viewsets
from application.api import router
from ugc.models import Post
from ugc.apy import PostSerializer, CommentSerializer
from message.api import MessageSerializer, ChatSerializer
from like.api import LikeSerializer
from like.models import Like
from django.contrib.contenttypes.models import ContentType
from rest_framework.reverse import reverse

class EventSerializer(serializers.ModelSerializer):

    def get_target(self, obj):
        if obj.target_content_type.name == 'post':
            return PostSerializer(obj.target).data
        elif obj.target_content_type.name == 'comment':
            return CommentSerializer(obj.target).data
        elif obj.target_content_type.name == 'message':
            return MessageSerializer(obj.target).data
        elif obj.target_content_type.name == 'chat':
            return ChatSerializer(obj.target).data
        elif obj.target_content_type.name == 'like':
            return LikeSerializer(obj.target).data
        return obj.target_content_type.name

    def get_objtype(self, obj):
        return obj.target_content_type.name

    target = serializers.SerializerMethodField()
    objtype = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('author','target', 'objtype')

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = super(EventViewSet, self).get_queryset()
        #queryset = queryset.filter(author=self.request.user)
        return queryset



router.register(r'events', EventViewSet)
