# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-14 14:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ugc', '0004_auto_20170214_1402'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='content',
            field=models.CharField(max_length=2047, verbose_name='post_content'),
        ),
    ]
