# Generated by Django 3.1.4 on 2021-11-29 14:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_alumni', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='alumni',
            name='profile_picture',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='dp_alumnis', to='app_alumni.picture'),
        ),
        migrations.AlterField(
            model_name='alumni',
            name='pictures',
            field=models.ManyToManyField(blank=True, related_name='alumnis', to='app_alumni.Picture'),
        ),
    ]
