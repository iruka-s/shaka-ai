from django.urls import path

from .views import ListShaka, CreateShaka, DetailShaka

urlpatterns = [
    path('<int:pk>/', DetailShaka.as_view()),
    path('list/', ListShaka.as_view()),
    path('create/', CreateShaka.as_view()),
]