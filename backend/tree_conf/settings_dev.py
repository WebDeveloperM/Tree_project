DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'tree_db',
        'USER': 'postgres',
        'PASSWORD': '20010508',
        'HOST': 'localhost',
        'PORT': 5432,
    }
}

MAPS_API_KEY = "AIzaSyBI8bYXK0GzGBDEc_SCdHQ6RLPLIGDzB1Q"
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_HOST_USER = ''
# EMAIL_HOST_PASSWORD = ''
# SERVER_EMAIL = EMAIL_HOST_USER
# DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
