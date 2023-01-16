from django.shortcuts import render
from course.models import Course
from course.serializers.course_list import CourseListSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
# Create your views here.

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseListSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        courses = Course.objects.all()
        serializer = CourseListSerializer(courses, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = CourseListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)