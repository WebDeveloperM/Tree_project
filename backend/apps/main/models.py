from django.db import models
from django.db.models import SET_NULL
from main.queryset.plant import PlantQuerySet
from main.queryset.order import OrderQuerySet
from django.db.models import PROTECT
from main.utils.fields import LocationField
from main.utils.files import file_path


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, null=True)
    created_by = models.ForeignKey('users.User', SET_NULL, null=True, blank=True,
                                   related_name='created_%(model_name)ss')
    updated_by = models.ForeignKey('users.User', SET_NULL, null=True, blank=True,
                                   related_name='updated_%(model_name)ss')

    class Meta:
        abstract = True
        ordering = ('id',)


class Plant(BaseModel):
    CREATED = "Created"
    IN_ORDER = "In_order"
    DONE = "Done"

    STATUS = (
        (CREATED, 'Created'),
        (IN_ORDER, 'In_Order'),
        (DONE, 'Done'),
    )

    type = models.CharField(max_length=250)
    order = models.ForeignKey('Order', PROTECT, null=True, blank=False)
    investor = models.ForeignKey('users.User', PROTECT, related_name='investor_plants')
    farmer = models.ForeignKey('users.User', PROTECT, related_name='farmer_plants', null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    payment = models.ForeignKey('finance.Payment', PROTECT)
    status = models.CharField(max_length=255, choices=STATUS, default=CREATED)

    objects = PlantQuerySet.as_manager()

    class Meta:
        db_table = 'main_plants'

    def __str__(self):
        return f'{self.order} - {self.status}'


class Order(BaseModel):
    CREATED = "Created"
    IN_PROCESS = "In_process"
    DONE = "Done"

    STATUS = (
        (CREATED, 'Created'),
        (IN_PROCESS, 'In_process'),
        (DONE, 'Done'),
    )

    farmer = models.ForeignKey('users.User', PROTECT, null=True, blank=True)
    location = LocationField(blank=True, max_length=255)
    count = models.IntegerField()
    status = models.CharField(max_length=255, choices=STATUS, default=CREATED)
    address = models.CharField(max_length=250, null=True, blank=True)
    objects = OrderQuerySet.as_manager()

    class Meta:
        db_table = 'main_orders'

    def __str__(self):
        return f'{self.farmer} - {self.status}'
