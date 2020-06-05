from rest_framework import generics
from .models import Shaka
from .serializers import ShakaSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .utils import fasttext_exec


class ShakaViewSet(viewsets.ModelViewSet):
    queryset = Shaka.objects.all()
    serializer_class = ShakaSerializer

    @action(methods=['post'], detail=False)
    def set_point(self, request):

        # 点数計算に使用するメッセージ取得
        message = request.POST['message']
        print(message)
        
        # 点数計算
        analyze_result = fasttext_exec.analyze_sentence(message)        
        point = fasttext_exec.calc_zen_aku_point(analyze_result)
        print(point)
        
        shaka_result = ShakaSerializer(data={'message': message, 'point': point})
        if shaka_result.is_valid():
            shaka_result.save()
            return Response(shaka_result.data)
        
        return Response(shaka_result.error)