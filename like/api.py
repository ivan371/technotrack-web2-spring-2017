from like.models  import Like
from rest_framework import serializers, viewsets
from application.api import router
from django.shortcuts import get_object_or_404
from friend.models import Friend
from rest_framework.reverse import reverse
from django.db.models import Q

class LikeSerializer(serializers.HyperlinkedModelSerializer):

    def get_target(self, obj):
        viewname = '%s-detail' % obj.target_content_type.name
        return reverse(viewname, (obj.target_id,))

    target = serializers.SerializerMethodField()

    class Meta:
        model = Like
        fields = ('author', 'target')

class LikeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def get_queryset(self):
        queryset = super(LikeViewSet, self).get_queryset()
        friends_ids = Friend.objects.filter(first = self.request.user).values_list('second', flat=True)
        queryset = queryset.filter(Q(author = self.request.user) | Q(author=friends_ids))
        if 'id' in self.request.query_params:
            get_object_or_404(
                Friend,
                first=self.request.user,
                second=self.request.query_params['id']
            )
            queryset = queryset.filter(target_id=self.request.query_params['id'])
        return queryset


router.register(r'likes', LikeViewSet)
