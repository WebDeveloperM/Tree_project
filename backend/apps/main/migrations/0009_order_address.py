# Generated by Django 4.2.2 on 2023-06-25 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_alter_plant_image_alter_plant_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='address',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
