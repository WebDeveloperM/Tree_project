from django.contrib import admin

from .models import User, SmsCode


# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    ...


@admin.register(SmsCode)
class SmscodeAdmin(admin.ModelAdmin):
    ...