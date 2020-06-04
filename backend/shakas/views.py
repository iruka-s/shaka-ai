from rest_framework import generics
from .models import Shaka
from .serializers import ShakaSerializer
from rest_framework import viewsets


class ShakaViewSet(viewsets.ModelViewSet):
    queryset = Shaka.objects.all()
    serializer_class = ShakaSerializer