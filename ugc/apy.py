# coding: utf-8

from rest_framework import serializers, viewsets, permissions
from ugc.models import Post, Comment
from friend.models import Friend
from application.api import router
from django.shortcuts import get_object_or_404
from django.db.models import Q
from core.api import UserSerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)
    id = serializers.ReadOnlyField()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    class Meta:
        model = Comment
        fields = ('id', 'text', 'author', 'like_count')

class CommentRetrieve(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(CommentRetrieve, self).get_queryset()
        print self.request.query_params
        if 'author' in self.request.query_params:
            queryset = queryset.filter(author=self.request.query_params['author'])
        if 'post' in self.request.query_params:
            queryset = queryset.filter(post=self.request.query_params['post'])

class PostSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)
    comment_count = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    short_content = serializers.ReadOnlyField()
    comment_set = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id','title', 'content','author', 'short_content', 'comment_count', 'like_count', 'comment_set')




class PostRetrieve(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(PostRetrieve, self).get_queryset()
        friends_ids = Friend.objects.filter(first = self.request.user).values_list('second', flat=True)
        # queryset = queryset.filter(Q(author = self.request.user) | Q(author=friends_ids))
        if 'author' in self.request.query_params:
            queryset = queryset.filter(author=self.request.query_params['author'])
        else:
            queryset = queryset.filter(author = self.request.user)
        return queryset



        return queryset

router.register(r'posts', PostRetrieve)
router.register(r'comments', CommentRetrieve)
