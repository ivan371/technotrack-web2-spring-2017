# coding: utf-8

from rest_framework import serializers, viewsets, permissions
from ugc.models import Post, Comment
from application.api import router


class PostSerializer(serializers.HyperlinkedModelSerializer):

    author = serializers.ReadOnlyField(source='author_id')

    class Meta:
        model = Post
        fields = ('url','title', 'content','author', 'short_content', 'comment_count')


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user

class PostRetrieve(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = super(PostRetrieve, self).get_queryset()
        if 'author' in self.request.query_params:
            queryset = queryset.filter(author=self.request.query_params['author'])
        return queryset


class CommentSerializer(serializers.HyperlinkedModelSerializer):

    author = serializers.ReadOnlyField(source='author_id')
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    class Meta:
        model = Comment
        fields = ('url', 'text', 'author')

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
        return queryset

router.register(r'posts', PostRetrieve)
router.register(r'comments', CommentRetrieve)
