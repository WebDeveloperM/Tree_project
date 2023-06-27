from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('main', '0010_alter_plant_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plant',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='')
        )
    ]
