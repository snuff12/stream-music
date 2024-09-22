# Generated by Django 4.2.16 on 2024-09-22 14:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('files', '0001_initial'),
        ('pitches', '0003_pitch_agency_pitch_composer'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pitch',
            name='agency_email',
        ),
        migrations.RemoveField(
            model_name='pitch',
            name='composer_email',
        ),
        migrations.RemoveField(
            model_name='pitch',
            name='file_name',
        ),
        migrations.AddField(
            model_name='pitch',
            name='file',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='files.file'),
        ),
        migrations.AlterField(
            model_name='pitch',
            name='agency',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pitches_received', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='pitch',
            name='composer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pitches_sent', to=settings.AUTH_USER_MODEL),
        ),
    ]
