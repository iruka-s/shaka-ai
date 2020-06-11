from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import UserViewset, ShakaViewSet

router = SimpleRouter()
router.register('users', UserViewset, basename='users')
router.register(r'shakas', ShakaViewSet)

urlpatterns = router.urls