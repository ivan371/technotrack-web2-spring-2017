from friend.models import Friend, FriendShip
from rest_framework import serializers, viewsets, permissions, generics
from application.api import router
from core.models import User
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class FriendSerializer(serializers.HyperlinkedModelSerializer):
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
        fields = ('iniciator', 'repliciant', 'approved')


class FriendShipCreateSerializer(serializers.HyperlinkedModelSerializer):

    permission_classes = (permissions.IsAuthenticated,)
    iniciator = serializers.ReadOnlyField(source='iniciator_id')
    approved = serializers.ReadOnlyField()

    class Meta:
        model = FriendShip
        fields = ('iniciator', 'repliciant', 'approved')


class FriendShipUpdate(generics.UpdateAPIView, generics.RetrieveAPIView):
    serializer_class = FriendShipUpdateSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        print instance.approved
        if instance.approved == True:
            Friend.objects.create(first = instance.iniciator, second = instance.repliciant)
            Friend.objects.create(first = instance.repliciant, second = instance.iniciator)
        else:
            fr1 = get_object_or_404(Friend, first = instance.iniciator, second = instance.repliciant)
            fr2 = get_object_or_404(Friend, first = instance.repliciant, second = instance.iniciator)
            fr1.delete()
            fr2.delete()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def get_queryset(self):
        return FriendShip.objects.filter(iniciator = self.request.user)

class FriendShipCreate(generics.CreateAPIView):
    queryset = FriendShip.objects.all()
    serializer_class = FriendShipCreateSerializer

    def perform_create(self, serializer):
        serializer.save(iniciator=self.request.user, approved=False)

router.register(r'friend', FriendViewSet)
#router.register(r'friendship', FriendShipViewSet)
