from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Shaka


class ShakaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shaka
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'username',)