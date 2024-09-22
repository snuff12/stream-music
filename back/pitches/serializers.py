from rest_framework import serializers
from .models import Pitch

class PitchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pitch
        fields = ['composer', 'agency', 'file', 'composer_email', 'agency_email', 'pitched_at']  # Include all fields

class PitchListSerializer(serializers.ModelSerializer):
    file_name = serializers.CharField(source='file.file.name', read_only=True)  # Get the file name from the File model

    class Meta:
        model = Pitch
        fields = ['composer', 'agency', 'file_name', 'composer_email', 'agency_email', 'pitched_at']