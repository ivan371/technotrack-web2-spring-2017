from friend.models import Friend, FriendShip
from rest_framework import serializers, viewsets, permissions
from application.api import router


class FriendSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Friend
        fields = ('first', 'second')

class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer


class FriendShipSerializer(serializers.HyperlinkedModelSerializer):

    iniciator = serializers.ReadOnlyField(source='iniciator_id')

    class Meta:
        model = FriendShip
        fields = ('url','iniciator', 'repliciant', 'approved')

class FriendShipViewSet(viewsets.ModelViewSet):
    queryset = FriendShip.objects.all()
    serializer_class = FriendShipSerializer

    def perform_create(self, serializer):
        serializer.save(iniciator=self.request.user)

    def get_queryset(self):
        queryset = super(FriendShipViewSet, self).get_queryset()
        if 'na' in self.request.query_params:
            queryset = queryset.filter(approved=False)
        return queryset

router.register(r'friend', FriendViewSet)
router.register(r'friendship', FriendShipViewSet)
