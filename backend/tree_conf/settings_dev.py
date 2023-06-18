DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
<<<<<<< HEAD
        'NAME': 'tree_db',
        'USER': 'postgres',
        'PASSWORD': '20010508',
=======
        'NAME': 'tree_database',
        'USER': 'postgres',
        'PASSWORD': 'superuser',
>>>>>>> 158f02b2e7dd55a29bd55d4a92d05c6c9b5a6366
        'HOST': 'localhost',
        'PORT': 5432,
    }
}

# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_HOST_USER = ''
# EMAIL_HOST_PASSWORD = ''
# SERVER_EMAIL = EMAIL_HOST_USER
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
