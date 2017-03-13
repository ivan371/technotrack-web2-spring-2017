from core.models  import User
from rest_framework import serializers, viewsets, permissions, generics
from application.api import router
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class UserSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name','last_name', 'rating')

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = super(UserViewSet, self).get_queryset()
        if 'user' in self.request.query_params:
            queryset = queryset.filter(id=self.request.query_params['user'])
        else:
            queryset = queryset.filter(username=self.request.user.username)
        return queryset

class MySerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name','last_name', 'rating')


class MyViewSet(viewsets.ViewSet):
    model = User
    serializer_class = MySerializer
    lookup_field = 'username'

    def get(self):
        pass

    def put(self):
        pass


router.register(r'users', UserViewSet)
router.register(r'user', MyViewSet)
