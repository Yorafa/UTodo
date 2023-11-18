from rest_framework import serializers
from course.models import Course
from assessment.serializers.assessment import AssessmentIdSerializer

class CourseSerializer(serializers.ModelSerializer):
    assessments = AssessmentIdSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ('id', 'assessments', 'name', 'description', 'university', 'year', 'semester', 'is_public', 'is_on_list', 'likes', 'user')

class OnListCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'year', 'semester', 'is_on_list')