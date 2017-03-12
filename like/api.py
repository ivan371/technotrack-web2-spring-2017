from like.models  import Like
from rest_framework import serializers, viewsets
from application.api import router

class LikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Like
        fields = ('author',)

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer



router.register(r'likes', LikeViewSet)
