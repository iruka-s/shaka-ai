from rest_framework import serializers
from .models import Shaka


class ShakaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shaka
        fields = '__all__'