from django.shortcuts import render
from course.models import Course
from course.serializers.course import CourseSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
# Create your views here.

class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        try:
            course = Course.objects.get(pk=kwargs['pk'])
            serializer = CourseSerializer(course)
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response("Course does not exist")
    
    def put(self, request, *args, **kwargs):
        try:
            course = Course.objects.get(pk=kwargs['pk'])
            serializer = CourseSerializer(course, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Course.DoesNotExist:
            return Response("Course does not exist")

    def delete(self, request, *args, **kwargs):
        try:
            course = Course.objects.get(pk=kwargs['pk'])
            course.delete()
            return Response("Course has been deleted")
        except Course.DoesNotExist:
            return Response("Course does not exist")
