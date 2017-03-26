from django.conf.urls import url
from core.views import*
from core.api import *

urlpatterns = [
    #url(r'^core/', vklogin),
    url(r'^',index),
]
