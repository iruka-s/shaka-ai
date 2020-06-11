from rest_framework import generics
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from .models import Shaka
from .serializers import ShakaSerializer, UserSerializer
from .utils import fasttext_exec


class ShakaViewSet(viewsets.ModelViewSet):
    queryset = Shaka.objects.all()
    serializer_class = ShakaSerializer

    @action(methods=['post'], detail=False)
    def set_point(self, request):

        # トークンキー取得
        key = str(request.auth)

        # 点数計算に使用するメッセージ取得
        message = request.POST['message']
        
        # 点数計算
        analyze_result = fasttext_exec.analyze_sentence(message)        
        point = fasttext_exec.calc_zen_aku_point(analyze_result)
        
        shaka_result = ShakaSerializer(data={'key': key,'message': message, 'point': point})
        if shaka_result.is_valid():
            shaka_result.save()
            return Response(shaka_result.data)
        
        return Response(shaka_result.error)
    
    @action(methods=['get'], detail=False)
    def get_user_result(self, request):

        # トークンキー取得
        token_key = str(request.auth)

        # トークンキーと一致するDB要素を探す
        result_array = []
        for shaka in self.get_queryset():
            if token_key == shaka.key:
                result_array.append({'key': shaka.key,'message': shaka.message, 'point': shaka.point})


        return Response(result_array)


class UserViewset(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer