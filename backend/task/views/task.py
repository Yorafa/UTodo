from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from task.models import Task
from task.serializers.task import TaskSerializer
from rest_framework import status
from rest_framework.response import Response

class TaskView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        task_id = self.kwargs['pk']
        task = Task.objects.get(id=task_id)

        if task.assessment.course.user == user:
            return Task.objects.filter(id=task_id)
        else:
            return Task.objects.none()
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.assessment.course.user != request.user:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.assessment.course.user != request.user:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
class AssessmentTaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(assessment=self.kwargs['pk'])