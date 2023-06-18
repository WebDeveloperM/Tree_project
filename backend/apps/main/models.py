from django.db import models
from django.db.models import SET_NULL
from main.queryset.plant import PlantQuerySet
from main.queryset.order import OrderQuerySet
from django.db.models import CASCADE, PROTECT


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
    type = models.CharField(max_length=250)
    order = models.ForeignKey('Order', PROTECT, null=True, blank=False)
    user = models.ForeignKey('users.User', PROTECT)
    image = models.ImageField()
    payment = models.ForeignKey('finance.Payment', PROTECT)

    objects = PlantQuerySet.as_manager()

    class Meta:
        db_table = 'main_plants'


class Order(BaseModel):
    CREATED = "created"
    IN_PROCESS = "in_process"
    DONE = "done"

    STATUS = (
        (CREATED, 'Created'),
        (IN_PROCESS, 'In process'),
        (DONE, 'Done'),
    )

    farmer = models.ForeignKey('users.User', PROTECT, null=True, blank=True)
    latitude = models.FloatField()  # x
    longitude = models.FloatField()  # y
    count = models.IntegerField()
    status = models.CharField(max_length=255, choices=STATUS, default=CREATED)

    objects = OrderQuerySet.as_manager()

    class Meta:
        db_table = 'main_orders'
