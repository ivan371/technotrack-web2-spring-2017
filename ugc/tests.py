from django.test import TestCase
from ugc.models import Post, Comment
from core.models import User
from like.models import Like, Likeable
from django.contrib.contenttypes.models import ContentType

class TestUGC(TestCase):

    def setUp(self):
        self.testuser = User.objects.create()
        self.testpost = Post(author=self.testuser, title="bla", content="blabla")
        self.testpost.save()
        self.comment = Comment(author=self.testuser, post=self.testpost, text="asdf")
        self.comment.save()

    def test_comment_count(self):
        assert self.testpost.comment_count == 1


    def test_rating_count(self):
        for i in range(1001):
            testlike = Like(author=self.testuser,
                target=self.testpost,
                target_id=self.testpost.pk,
                power=100,
                target_content_type=ContentType.objects.get_for_model(Like))
            testlike.save()
            assert self.testpost.like_count == i + 1
        assert self.testuser.rating == 100

    def tearDown(self):
        self.testuser.delete()
