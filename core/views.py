from django.shortcuts import render, HttpResponse
import json
from django.shortcuts import render, reverse, redirect
from django.views.generic import CreateView
from core.models import User
from core.forms import RegistrationForm
from core.helpers import send_mail
from core.tasks import send_activation_email
import random

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

    def form_valid(self, form):
        instance = form.save(commit=False)
        code = random.randint(1000, 9999)
        instance.activation_code = code
        instance.save()
        res = send_activation_email.apply_async(['admin@admin.ru', form.cleaned_data['email'], code])
        return redirect(self.get_success_url())

    def get_success_url(self):
        return reverse('core:login')
