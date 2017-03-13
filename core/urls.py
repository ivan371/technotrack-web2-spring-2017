from django.conf.urls import url
from core.views import*

urlpatterns = [
    url(r'^core/', vklogin),
]
