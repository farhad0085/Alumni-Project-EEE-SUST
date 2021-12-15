# Generated by Django 3.1.4 on 2021-12-15 15:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Picture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('picture', models.ImageField(upload_to='pictures')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Alumni',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=200)),
                ('address', models.TextField(blank=True)),
                ('birth_of_date', models.DateField(blank=True, help_text='Format: YYYY-MM-DD', null=True)),
                ('session', models.CharField(help_text='Eg: 2012-13', max_length=10)),
                ('passing_year', models.CharField(max_length=10)),
                ('is_employed', models.BooleanField(default=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('contact_number', models.CharField(blank=True, max_length=20, null=True)),
                ('company', models.CharField(blank=True, max_length=200, null=True)),
                ('designation', models.CharField(blank=True, max_length=500, null=True)),
                ('biography', models.TextField(blank=True)),
                ('is_featured', models.BooleanField(default=False)),
                ('pictures', models.ManyToManyField(blank=True, related_name='alumnis', to='app_alumni.Picture')),
                ('profile_picture', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='dp_alumnis', to='app_alumni.picture')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
