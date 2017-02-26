from django.test import TestCase
from ugc.models import Post, Comment
from core.models import User
from like.models import Like, Likeable
from django.contrib.contenttypes.models import ContentType

class TestUGC(TestCase):

    def setUp(self):
        self.testuser = User.objects.create()
        self.testpost = Post.objects.create(author=self.testuser)
        self.comment = Comment(author=self.testuser, post=self.testpost, text="asdf")
        self.comment.save()

    def test_comment_count(self):
        assert self.testpost.comment_count == 1

    def test_like_count(self):
        self.testpost1 = Post(author=self.testuser)
        self.testpost1.save()
        self.testlike = Like(author=self.testuser,
            target=self.testpost1,
            target_id=self.testpost1.pk,
            power=100,
            target_content_type=ContentType.objects.get_for_model(Like))
        self.testlike.save()
        assert self.testpost1.like_count == 1

    def tearDown(self):
        self.comment.delete()
        self.testuser.delete()
        self.testpost.delete()
