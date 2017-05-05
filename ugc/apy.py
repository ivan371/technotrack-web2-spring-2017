# coding: utf-8

from rest_framework import serializers, viewsets, permissions
from ugc.models import Post, Comment
from friend.models import Friend
from application.api import router
from django.shortcuts import get_object_or_404
from django.db.models import Q
from core.api import UserSerializer
from like.api import LikeSerializer
from like.models import Like
from ugc.search_indexes import PostIndex
from drf_haystack.serializers import HaystackSerializer, HaystackSerializerMixin
from drf_haystack.viewsets import HaystackViewSet


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)
    id = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    permission_classes = (permissions.IsAuthenticated)

    class Meta:
        model = Comment
        fields = ('id', 'text', 'author', 'like_count')

class CommentRetrieve(viewsets.ModelViewSet):

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        if 'post' in self.request.query_params:
            print 'post'
            serializer.save(author=self.request.user, post_id=self.request.query_params['post'])

    def get_queryset(self):
        queryset = super(CommentRetrieve, self).get_queryset()
        # if 'author' in self.request.query_params:
            # queryset = queryset.filter(author=self.request.query_params['author'])
        if 'post' in self.request.query_params:
            queryset = queryset.filter(post=self.request.query_params['post'])
        return queryset

class PostSerializer(serializers.ModelSerializer):

    def get_likes(self, obj):
        queryset = Like.objects.filter(target_id=obj.id)
        serializer = LikeSerializer(queryset, many=True)
        return serializer.data

    author = UserSerializer(read_only=True)
    comment_count = serializers.ReadOnlyField()
    like_count = serializers.ReadOnlyField()
    short_content = serializers.ReadOnlyField()
    comment_set = CommentSerializer(many=True, read_only=True)
    likes = serializers.SerializerMethodField()
    # likes = serializersPrimaryKeyRelatedField(queryset=Like.objects.all())
    class Meta:
        model = Post
        fields = (
        'id',
        'title',
        'content',
        'author',
        'short_content',
        'comment_count',
        'like_count',
        'comment_set',
        'likes')

class PostHaystack(HaystackSerializerMixin, PostSerializer):
    class Meta(PostSerializer.Meta):
        search_fields = ('text',)


class PostRetrieve(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # serializer_class = PostHaystack
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(PostRetrieve, self).get_queryset()
        friends_ids = Friend.objects.filter(first = self.request.user).values_list('second', flat=True)
        # queryset = queryset.filter(Q(author = self.request.user) | Q(author=friends_ids))
        if 'author' in self.request.query_params:
            queryset = queryset.filter(author=self.request.query_params['author']).order_by('-id')
        else:
            queryset = queryset.filter(author = self.request.user).order_by('-id')
        return queryset



        return queryset

router.register(r'posts', PostRetrieve)
router.register(r'comments', CommentRetrieve)
