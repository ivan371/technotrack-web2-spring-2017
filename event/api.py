from event.models  import Event
from rest_framework import serializers, viewsets
from application.api import router

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('author',)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer



router.register(r'events', EventViewSet)
