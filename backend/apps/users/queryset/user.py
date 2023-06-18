from django.contrib.auth.models import UserManager as BaseUserManager
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta

class UserManager(BaseUserManager):
    def unique_query(self):
        return self.filter(
            Q(verified_at__isnull=False) |
            # User has 24 hours to verify email. Otherwise new user could signup with this email.
            Q(date_joined__gte=timezone.now() - timedelta(days=1)) |
            Q(is_staff=True) |
            Q(is_active=True)
        )

    def remove_unverified(self, email):
        self.filter(email=email, verified_at__isnull=True, is_staff=False, is_active=False).delete()

    # def create_user(self, phone, password, code=None):
    #     if not phone:
    #         raise ValueError('Users must have an phone number')
    #     if not password:
    #         raise ValueError("PASSWORD?!?!?!? HELLO??")
    #     if not code:
    #         code = '1111'
    #
    #     user = self.model(
    #         email=phone,
    #         username=username,
    #         code=code,
    #         )
    #     user.set_password(password)
    #     user.save()
    #     return user
    #
    # def create_superuser(self, phone, password, code=None):
    #     self.create_user(phone, password, code)
    #     user.is_staff()
    #     user.is_superuser = True
    #     user.save()
    #     return user


    #
    #
    #
    # def _create_user(self, phone, password, is_staff, is_admin, **extra_fields):
    #     if not phone:
    #         raise ValueError('Users must have an phone number')
    #
    #     user = self.model(
    #         phone=phone,
    #         is_staff=is_staff,
    #         is_active=True,
    #         is_admin=is_admin,
    #         **extra_fields
    #     )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, phone, password, **extra_fields):
        user = self._create_user(phone, password, False, False, **extra_fields)
        user.save(using=self._db)

        return user

    def create_superuser(self, phone, password, **extra_fields):
        user = self._create_user(phone, password, True, True, **extra_fields)

        return user

# class UserManager(BaseUserManager):
#     def create_superuser(self, phone, password,  **extra_fields):
#         user = self.model(
#             phone=phone
#             **extra_fields
#         )
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
# def _create_user(self, phone, is_staff, is_admin, **extra_fields):
#     if not phone:
#         raise ValueError('Users must have an phone number')
#
#     now = timezone.now()
#
#     user = self.model(
#         phone=phone,
#         is_staff=is_staff,
#         is_active=True,
#         is_admin=is_admin,
#         last_login=now,
#         date_joined=now,
#         **extra_fields
#     )
#
#     user.save(using=self._db)
#
#     return user
#
# def create_user(self, phone, **extra_fields):
#     user = self._create_user(phone, True, False, **extra_fields )
#     user.save(using=self._db)
#
#     return user
#
# def create_superuser(self, phone, password, **extra_fields):
#     user = self._create_user(phone, password, True, True, **extra_fields)
#
#     return user
