from django.contrib import admin

from .models import User, SmsCode
from django.conf import settings

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('region', 'phone')

@admin.register(SmsCode)
class SmscodeAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        if settings.SMS_CODE_ACTIVE:
            return False
        return True
    def has_change_permission(self, request, obj=None):
        if settings.SMS_CODE_ACTIVE:
            return False
        return True

    def has_delete_permission(self, request, obj=None):
        if settings.SMS_CODE_ACTIVE:
            return False
        return True

