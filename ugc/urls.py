from django.conf.urls import url
from ugc.views import*

urlpatterns = [
    url(r'^posts/', PostListView.as_view(), name="post-list"),
]
