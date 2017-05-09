from like.models  import Like
from rest_framework import serializers, viewsets
from application.api import router
from django.shortcuts import get_object_or_404
from friend.models import Friend
from rest_framework.reverse import reverse
from django.db.models import Q
from core.api import UserSerializer
# from ugc.apy import PostSerializer, CommentSerializer
from django.contrib.contenttypes.models import ContentType
from ugc.models import Post, Comment

class LikeSerializer(serializers.HyperlinkedModelSerializer):

    # def get_target(self, obj):
    #     if obj.target_content_type.name == 'post':
    #         return PostSerializer(obj.target).data
    #     elif obj.target_content_type.name == 'comment':
    #         return CommentSerializer(obj.target).data
    #     return obj.target_content_type.name

    # target = serializers.SerializerMethodField()
    author = UserSerializer(read_only=True)
    target_id = serializers.ReadOnlyField()

    class Meta:
        model = Like
        fields = ('id', 'author', 'target_id')

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        queryset = super(LikeViewSet, self).get_queryset()
        if 'type' in self.request.query_params and 'id' in self.request.query_params:
            try:
                l = Like.objects.get(Q(target_id = self.request.query_params['id']) & Q(author=self.request.user))
                l.delete()
            except:
                if self.request.query_params['type'] == 'post':
                    serializer.save(
                        author=self.request.user,
                        target_id=self.request.query_params['id'],
                        target_content_type=ContentType.objects.get_for_model(Post)
                    )
                elif self.request.query_params['type'] == 'comment':
                    serializer.save(
                        author=self.request.user,
                        target_id=self.request.query_params['id'],
                        target_content_type=ContentType.objects.get_for_model(Comment)
                    )

    def get_queryset(self):
        queryset = super(LikeViewSet, self).get_queryset()
        if 'type' in self.request.query_params:
            if self.request.query_params['type'] == 'post':
                queryset = queryset.filter(target_content_type=ContentType.objects.get_for_model(Post))
            elif self.request.query_params['type'] == 'comment':
                queryset = queryset.filter(target_content_type=ContentType.objects.get_for_model(Comment))
        if 'id' in self.request.query_params:
                queryset = queryset.filter(target_id=self.request.query_params['id'])
        return queryset


router.register(r'likes', LikeViewSet)
