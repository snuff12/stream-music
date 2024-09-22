from rest_framework import generics, permissions
from .models import File
from .serializers import FileSerializer

class FileUploadView(generics.CreateAPIView):
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return File.objects.filter(owner=self.request.user)