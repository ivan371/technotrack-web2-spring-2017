from rest_framework import routers
from ugc.apy import PostRetrieve

router = routers.DefaultRouter()
router.register(r'posts', PostRetrieve)
