from django.shortcuts import render
from task.models import Task
from backend.task.serializers.task import TaskSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response

# Create your views here.

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        try:
            task = Task.objects.get(pk=kwargs['pk'])
            serializer = TaskSerializer(task)
            return Response(serializer.data)
        except Task.DoesNotExist:
            return Response("Task does not exist")

    def put(self, request, *args, **kwargs):
        try:
            task = Task.objects.get(pk=kwargs['pk'])
            serializer = TaskSerializer(task, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Task.DoesNotExist:
            return Response("Task does not exist")

    def delete(self, request, *args, **kwargs):
        try:
            task = Task.objects.get(pk=kwargs['pk'])
            task.delete()
            return Response("Task has been deleted")
        except Task.DoesNotExist:
            return Response("Task does not exist")