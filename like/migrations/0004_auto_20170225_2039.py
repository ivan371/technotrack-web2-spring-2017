# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-25 20:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('like', '0003_auto_20170225_1848'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
