from django.contrib import admin

from .models import User, SmsCode
from django.conf import settings

from main.admin import AuthorMixin


# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('region', 'phone')
    fields = ('phone', 'type', 'region', 'dispatch_id')


@admin.register(SmsCode)
class SmscodeAdmin(AuthorMixin, admin.ModelAdmin):
    list_display = ('dispatch_id', 'code')
    fields = ('dispatch_id', 'code')

    def has_add_permission(self, request, obj=None):
        return False


    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
