from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from task.serializers.task import TaskSerializer
from assessment.models import Assessment

class CreateTaskAPIView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        assessment = Assessment.objects.filter(id=self.kwargs['pk'])
        if not assessment.exists():
            raise PermissionDenied("No such assessment.")
        if assessment.first().course.user != self.request.user:
            raise PermissionDenied("You do not have permission to add task to this assessment.")
        serializer.save(assessment_id=self.kwargs['pk'])
