from django.db import models
from main.models import BaseModel
from django.db.models import PROTECT


class Card(BaseModel):
    number = models.BigIntegerField()
    due_date = models.IntegerField()
    user = models.ForeignKey('users.User', PROTECT)

    class Meta:
        db_table = 'finance_cards'

    def __str__(self):
        return f'{self.user} - {self.number}'


class Payment(BaseModel):
    user = models.ForeignKey('users.User', PROTECT)
    card = models.ForeignKey(Card, PROTECT)
    count = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)

    class Meta:
        db_table = 'finance_payments'

    def __str__(self):
        return f'{self.user} - {self.count}'