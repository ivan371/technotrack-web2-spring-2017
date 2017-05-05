# coding: utf-8
from django.shortcuts import render
from .models import Post
from django.views.generic import ListView
from haystack.query import SearchQuerySet, AutoQuery
from django.http import JsonResponse

class PostListView(ListView):
    model = Post
    template_name = 'ugc/post_list.html'

    def get_queryset(self):
        sqs = SearchQuerySet()
        sqs = sqs.models(self.model)
        query = self.request.GET.get('query')
        if query:
            sqs = sqs.filter(text=AutoQuery(query))
        author = self.request.GET.get('author')
        if author:
            sqs = sqs.filter(author_id=author)
        else:
            sqs = sqs.filter(author=self.request.user)        
        return sqs.load_all()

    def render_to_response(self, context, **response_kwargs):
        if self.request.is_ajax() or 1 is 1:
            data = {
                'status': 'ok',
                'count': '1',
                'results': [
                    {
                        'id': x.object.id,
                        'title': x.object.title,
                        'content': x.object.content,
                        'like_count': x.object.like_count,
                        'author': {
                            'id': x.object.author.id,
                            'username': x.object.author.username,
                            'email': x.object.author.email,
                            'first_name': x.object.author.first_name,
                            'last_name': x.object.author.last_name,
                            'rating': x.object.author.rating,
                            'avatar': x.object.author.avatar.url,
                        }
                    }
                    for x in context['object_list']
                ]
            }
            response = JsonResponse(data, **response_kwargs)
        else:
            response = super(PostListView, self).render_to_response(
                context,
                **response_kwargs
            )
        return response
