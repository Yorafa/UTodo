from rest_framework import serializers
from course.models import Course

class CourseFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('name', 'description', 'university', 'grade_now', 'grade_total', 'year', 'semester', 'is_public', 'is_show_grade')