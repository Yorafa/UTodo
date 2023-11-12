from rest_framework import serializers
from course.models import Course

class PublicCourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'university', 'year', 'semester', 'grade_now', 'grade_total']