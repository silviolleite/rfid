# Generated by Django 2.1.2 on 2018-11-07 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='nome')),
            ],
            options={
                'verbose_name': 'local',
                'verbose_name_plural': 'locais',
            },
        ),
        migrations.AddField(
            model_name='tag',
            name='places',
            field=models.ManyToManyField(blank=True, to='core.Place', verbose_name='locais'),
        ),
    ]
