# Generated by Django 2.1.2 on 2018-11-15 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20181107_0955'),
    ]

    operations = [
        migrations.AddField(
            model_name='access_log',
            name='access_type',
            field=models.SmallIntegerField(blank=True, default=1, null=True, verbose_name='tipo'),
        ),
    ]
