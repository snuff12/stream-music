from accounts.models import User
from rest_framework import generics, permissions
from .models import Pitch
from .serializers import PitchListSerializer, PitchSerializer

class PitchCreateView(generics.CreateAPIView):
    serializer_class = PitchSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        composer_email = self.request.data.get('composer_email')
        agency_email = self.request.data.get('agency_email')
        composer = User.objects.get(email=composer_email)
        agency = User.objects.get(email=agency_email)

        serializer.save(composer=composer, agency=agency, composer_email=composer_email, agency_email=agency_email)

        
class PitchListView(generics.ListAPIView):
    serializer_class = PitchListSerializer  # Use the new serializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        if self.request.user.user_type == 'agency':
            return Pitch.objects.filter(agency=self.request.user)
        else:
            return Pitch.objects.filter(composer=self.request.user)