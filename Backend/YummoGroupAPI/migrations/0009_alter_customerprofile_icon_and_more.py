# Generated by Django 4.1.7 on 2023-04-01 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('YummoGroupAPI', '0008_alter_customerprofile_icon_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='icon',
            field=models.ImageField(blank=True, default='images/default-user-icon.jpg', null=True, upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='merchantprofile',
            name='icon',
            field=models.ImageField(blank=True, default='images/default-user-icon.jpg', null=True, upload_to='images/'),
        ),
    ]
