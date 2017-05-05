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
        return sqs.load_all()

    def render_to_response(self, context, **response_kwargs):
        if self.request.is_ajax() or 1 is 1:
            data = {
                'status': 'ok',
                'results': [
                    {
                        'id': x.object.id,
                        'title': x.object.title,
                        'content': x.object.content,
                        'like_count': x.object.like_count,
                        'author': {
                            'id': x.objects.author.id,
                            'username': x.objects.author.username,
                            'email': x.objects.author.email,
                            'first_name': x.objects.author.first_name,
                            'last_name': x.objects.author.last_name,
                            'rating': x.objects.author.rating,
                            'avatar': x.objects.author.avatar,
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
