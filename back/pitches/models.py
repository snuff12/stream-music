from django.db import models
from accounts.models import User
from files.models import File

class Pitch(models.Model):
    composer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pitches_sent', null=True, blank=True)
    agency = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pitches_received', null=True, blank=True)
    composer_email = models.EmailField(null=True, blank=True)  # Email of the composer
    agency_email = models.EmailField(null=True, blank=True)  # Email of the agency
    file = models.ForeignKey(File, on_delete=models.CASCADE, null=True, blank=True)  # Allow null values
    pitched_at = models.DateTimeField(auto_now_add=True)