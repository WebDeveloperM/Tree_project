"""
URL configuration for tree_conf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin_for_tree/', admin.site.urls),
    path('api/v1/', include([
        path('users/', include(('users.urls', 'apps.users'), namespace='users')),
        path('finance/', include(('finance.urls', 'apps.finance'), namespace='finance')),
        path('main/', include(('main.urls', 'apps.main'), namespace='main'))
    ])),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
