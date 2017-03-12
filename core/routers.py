from rest_framework import routers
from core.api import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
