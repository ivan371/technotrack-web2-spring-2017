# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-30 13:04
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0004_auto_20170225_2040'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatuser',
            old_name='user',
            new_name='author',
        ),
    ]
