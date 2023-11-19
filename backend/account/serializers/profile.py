from rest_framework import serializers
from django.contrib.auth.models import User
from course.serializers.course import CourseSerializer

class ProfileSerializer(serializers.ModelSerializer):
    liked_courses = CourseSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'liked_courses')
