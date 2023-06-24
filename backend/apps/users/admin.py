from django.contrib import admin

from .models import User, SmsCode
from django.conf import settings


# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('region', 'phone')


@admin.register(SmsCode)
class SmscodeAdmin(admin.ModelAdmin):
    fields = ('dispatch_id', 'code', "user")

    def has_add_permission(self, request, obj=None):
        return not settings.SMS_CODE_ACTIVE

    def has_change_permission(self, request, obj=None):
        return not settings.SMS_CODE_ACTIVE

    def has_delete_permission(self, request, obj=None):
        return not settings.SMS_CODE_ACTIVE
