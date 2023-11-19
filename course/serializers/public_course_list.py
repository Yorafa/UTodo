from rest_framework import serializers
from course.models import Course
from assessment.serializers.assessment import AssessmentSerializer
from account.serializers.profile import ProfileSerializer
class PublicCourseListSerializer(serializers.ModelSerializer):
    assessments = AssessmentSerializer(many=True, read_only=True)
    user = ProfileSerializer(read_only=True)
    class Meta:
        model = Course
        fields = ['id', 'name', 'user', 'description', 'university', 'year', 'semester', 'is_public', 'is_on_list', 'assessments']