from rest_framework import generics
from .models import Shaka
from .serializers import ShakaSerializer


class ListShaka(generics.ListAPIView):
    queryset = Shaka.objects.all()
    serializer_class = ShakaSerializer

class CreateShaka(generics.CreateAPIView):
    queryset = Shaka.objects.all()
    serializer_class = ShakaSerializer

class DetailShaka(generics.RetrieveAPIView):
    queryset = Shaka.objects.all()
    serializer_class = ShakaSerializer