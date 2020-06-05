from django.urls import path
from rest_framework import routers

from .views import ShakaViewSet

router = routers.DefaultRouter()
router.register(r'shakas', ShakaViewSet)
