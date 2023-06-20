from django.core.exceptions import ValidationError
from django.forms import ModelForm

from main.models import Plant


class OrderForm(ModelForm):
    def clean_count(self):
        count = self.cleaned_data.get('count')
        available = Plant.objects.filter(order=None).count()
        if count > available:
            raise ValidationError(f"Only {available} plants are available at he moment")
        return count