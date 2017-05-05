from django.conf.urls import url
from core.views import*
from core.api import *
from django.contrib.auth.views import login, logout

urlpatterns = [
    url(r'^login/', login, {'template_name': 'core/login.html'}, name="login"),
    url(r'^logout/', logout, {'template_name': 'core/index.html'}, name="logout"),
    url(r'^registration/', Registration.as_view(), name="registration"),
    url(r'^',index),

]
