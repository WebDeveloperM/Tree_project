from pathlib import Path
import os
import sys

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-o+mk3)4ghy@5o7sk8e$-9d_6uip&puc!otely26fydz2o1&(b^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', False)

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1"

]

# Append module dir
sys.path.append(os.path.join(BASE_DIR, 'apps'))

# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',

    'main',
    'finance',
    'users',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'tree_conf.urls'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tree_conf.wsgi.application'

AUTH_USER_MODEL = 'users.User'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'postgres'),
        'USER': os.environ.get('POSTGRES_USER', 'postgres'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'localhost'),
        'PORT': os.environ.get('POSTGRES_PORT', 5432),
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'files/static')

MEDIA_URL = '/uploads/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'files/uploads')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1',
    'http://localhost:3000'
)

SMS_CODE_ACTIVE = True

ESKIZ_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQzMTgsInJvbGUiOm51bGwsImRhdGEiOnsiaWQiOjQzMTgsIm5hbWUiOiJTaGFib25vdiBNYSdydWYgQmFocmlkZGluIG8nZydsaSIsImVtYWlsIjoid2ViZGV2bWFydWYxNTE0QGdtYWlsLmNvbSIsInJvbGUiOm51bGwsImFwaV90b2tlbiI6bnVsbCwic3RhdHVzIjoiYWN0aXZlIiwic21zX2FwaV9sb2dpbiI6ImVza2l6MiIsInNtc19hcGlfcGFzc3dvcmQiOiJlJCRrIXoiLCJ1el9wcmljZSI6NTAsInVjZWxsX3ByaWNlIjoxMTUsInRlc3RfdWNlbGxfcHJpY2UiOm51bGwsImJhbGFuY2UiOjUwMDAsImlzX3ZpcCI6MCwiaG9zdCI6InNlcnZlcjEiLCJjcmVhdGVkX2F0IjoiMjAyMy0wNi0yNVQwODoxNTo1MS4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjMtMDYtMjdUMTc6Mzc6NDIuMDAwMDAwWiIsIndoaXRlbGlzdCI6bnVsbCwiaGFzX3BlcmZlY3R1bSI6MH0sImlhdCI6MTY4Nzg4ODAyMywiZXhwIjoxNjkwNDgwMDIzfQ.xl1OHLbwcT4fDa5oJ2SACVt-h9ZkvGvL5d56W3zwBQU"
try:
    from .settings_dev import *
except ImportError:
    pass

MAPS_API_KEY = "AIzaSyBI8bYXK0GzGBDEc_SCdHQ6RLPLIGDzB1Q"
