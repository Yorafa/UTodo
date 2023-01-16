from rest_framework import serializers
from course.models import Course
from assessment.serializers.Assessment import AssessmentSerializer
from assessment.models import Assessment

class CourseListSerializer(serializers.ModelSerializer):
    queryset = Course.objects.all()
    name = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model=Course
        fields = ('name', 'description', 'user')
        
    def create(self, validated_data):
        course = Course.objects.create(**validated_data)
        return course

    def update(self, instance, validated_data):
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance
    
