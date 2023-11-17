from rest_framework import serializers
from course.models import Course

class CourseFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'description', 'university', 'year', 'semester', 'is_public', 'is_on_list')