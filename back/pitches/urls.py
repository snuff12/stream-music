from django.urls import path
from .views import PitchCreateView, PitchListView

urlpatterns = [
    path('pitch/', PitchCreateView.as_view(), name='pitch-create'),
    path('pitches/', PitchListView.as_view(), name='pitch-list'),
]