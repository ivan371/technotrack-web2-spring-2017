from core.models  import User
from rest_framework import serializers, viewsets, permissions, generics, mixins
from application.api import router
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name','last_name', 'rating')

class UserViewSet(mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly,)

    def get_queryset(self):
        queryset = super(UserViewSet, self).get_queryset()
        if 'me' in self.request.query_params:
            queryset = queryset.filter(id=self.request.user.id)
        return queryset
router.register(r'users', UserViewSet)
