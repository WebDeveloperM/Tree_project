# Generated by Django 4.1.5 on 2023-06-18 13:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0004_remove_plant_user_plant_farmer_plant_investor_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='farmer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='farmer_plants', to=settings.AUTH_USER_MODEL),
        ),
    ]