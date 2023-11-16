from rest_framework import serializers
from course.models import Course
from assessment.serializers.assessment import AssessmentIdSerializer

class CourseSerializer(serializers.ModelSerializer):
    assessments = AssessmentIdSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = '__all__'

class OnListCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name', 'description', 'year', 'semester', 'is_on_list')