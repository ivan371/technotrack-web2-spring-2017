# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-14 14:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ugc', '0003_auto_20170212_1040'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='title',
            field=models.CharField(max_length=255, verbose_name='post_title'),
        ),
    ]
