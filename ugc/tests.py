from django.test import TestCase
from ugc.models import Post, Comment
from core.models import User

class TestUGC(TestCase):

    def setUp(self):
        self.testuser = User.objects.create()
        self.testpost = Post.objects.create(author=testuser)


    def tearDown(self):
        self.testuser.delete()
        self.testpost.delete()
