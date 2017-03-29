from event.models  import Event
from rest_framework import serializers, viewsets
from application.api import router
from ugc.models import Post
from ugc.apy import PostSerializer
from like.models import Like
from django.contrib.contenttypes.models import ContentType
from rest_framework.reverse import reverse

class EventSerializer(serializers.ModelSerializer):

    def get_target(self, obj):
        # viewname = '%s-detail' % obj.target_content_type.name
        # return reverse(viewname, (obj.target_id,))
        print obj.target_content_type.name
        if obj.target_content_type.name == 'post':
            return PostSerializer(obj.target).data
        return "1asdf"

    target = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ('author','target')

class EventViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_queryset(self):
        queryset = super(EventViewSet, self).get_queryset()
        #queryset = queryset.filter(author=self.request.user)
        return queryset



router.register(r'events', EventViewSet)
