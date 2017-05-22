from group.models import Groupp, GroupUser, PostGroup
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

class PostGroupSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)

    class Meta:
        model = PostGroup
        fields = ('id',
        'title',
        'content',
        'author',
        'short_content',
        'comment_count',
        'like_count',
        )

class PostGroupViewSet(viewsets.ModelViewSet):
    queryset = PostGroup.objects.all()
    serializer_class = PostGroupSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(PostGroupViewSet, self).get_queryset()
        if 'group' in self.request.query_params:
            queryset = queryset.filter(group=self.request.query_params['group']).order_by('-id')
        return queryset

class GroupUserSerializer(serializers.ModelSerializer):

    author = UserSerializer()

    class Meta:
        model = GroupUser
        fields = ('author', 'id',)

class GroupUserViewSet(viewsets.ModelViewSet):
    queryset = GroupUser.objects.all()
    serializer_class = GroupUserSerializer

    def perform_create(self, serializer):
        if 'group' in self.request.query_params:
            chat = Group.objects.get(id = self.request.query_params['group'])
            serializer.save(group=group)

    def get_queryset(self):
        queryset = super(GroupUserViewSet, self).get_queryset()
        if 'group' in self.request.query_params:
            queryset = queryset.filter(group=self.request.query_params['group'])
        return queryset

class GroupSerializer(serializers.ModelSerializer):

    groupuser_set = GroupUserSerializer(many=True, read_only=True)
    author = UserSerializer(read_only=True)
    class Meta:
        model = Groupp
        fields = ('name', 'groupuser_set', 'id', 'author')


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Groupp.objects.all()
    serializer_class = GroupSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(GroupViewSet, self).get_queryset()
        return queryset.filter(Q(groupuser__author=self.request.user) | Q(author=self.request.user)).distinct().order_by('id')

router.register(r'groups', GroupViewSet)
router.register(r'postgroup', PostGroupViewSet)
router.register(r'groupuser', GroupUserViewSet)
