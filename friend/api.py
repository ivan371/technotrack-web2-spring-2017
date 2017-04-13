from friend.models import Friend, FriendShip
from rest_framework import serializers, viewsets, permissions, generics, mixins
from application.api import router
from core.models import User
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from core.api import UserSerializer

class FriendSerializer(serializers.HyperlinkedModelSerializer):
    second = UserSerializer()
    class Meta:
        model = Friend
        fields = ('second',)

class FriendViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer

    def get_queryset(self):
        queryset = super(FriendViewSet, self).get_queryset()
        queryset = queryset.filter(first=self.request.user)
        if 'user' in self.request.query_params:
            us = User.objects.get(id = self.request.query_params['user'])
            queryset = Friend.objects.filter(first=us)
        return queryset

class FriendShipUpdateSerializer(serializers.HyperlinkedModelSerializer):

    permission_classes = (permissions.IsAuthenticated,)
    repliciant = serializers.ReadOnlyField(source='repliciant_id')
    iniciator = serializers.ReadOnlyField(source='iniciator_id')

    class Meta:
        model = FriendShip
        fields = ('url', 'iniciator', 'repliciant', 'approved')


class FriendShipUpdate(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = FriendShip.objects.all()
    serializer_class = FriendShipUpdateSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        print instance.approved
        if instance.approved == True:
            if instance.iniciator == self.request.user:
                Friend.objects.create(first = instance.repliciant, second = instance.iniciator)
            else:
                Friend.objects.create(first = instance.iniciator, second = instance.repliciant)
        else:
            if instance.iniciator == self.request.user:
                fr2 = get_object_or_404(Friend, first = instance.repliciant, second = instance.iniciator)
                fr2.delete()
            else:
                fr1 = get_object_or_404(Friend, first = instance.iniciator, second = instance.repliciant)
                fr1.delete()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def get_queryset(self):
        return FriendShip.objects.filter(iniciator = self.request.user)


class FriendShipCreateSerializer(serializers.HyperlinkedModelSerializer):

    permission_classes = (permissions.IsAuthenticated,)

    class Meta:
        model = FriendShip
        fields = ('repliciant',)


class FriendShipCreate(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = FriendShip.objects.all()
    serializer_class = FriendShipCreateSerializer

    def perform_create(self, serializer):
        serializer.save(iniciator=self.request.user, approved=False)


router.register(r'friend/create', FriendShipCreate)
router.register(r'friend', FriendViewSet)
router.register(r'friendship', FriendShipUpdate)
