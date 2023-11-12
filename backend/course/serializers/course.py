from rest_framework import serializers
from course.models import Course

class CourseSerializer(serializers.ModelSerializer):
    grade_now = serializers.SerializerMethodField()
    grade_total = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'university', 'year', 'semester', 'grade_now', 'grade_total', 'is_public', 'is_show_grade']
    
    def get_grade_now(self, obj):
        if obj.is_show_grade:
            return obj.grade_now
        return None
    
    def get_grade_total(self, obj):
        if obj.is_show_grade:
            return obj.grade_total
        return None
