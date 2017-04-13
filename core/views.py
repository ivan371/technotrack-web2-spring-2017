from django.shortcuts import render, HttpResponse
import json
from django.shortcuts import render, reverse
from django.views.generic import CreateView
from core.models import User
from core.forms import RegistrationForm

def accounts(request):
    return render(request,'core/login-vk.html')

def index(request):
    return render(request,'core/index.html')

def myid(request):
    return HttpResponse (json.dumps(request.user.id), content_type="application/json")

class Registration(CreateView):
    template_name = 'core/registration.html'
    model = User
    form_class = RegistrationForm
    def get_success_url(self):
         return reverse('core:login')