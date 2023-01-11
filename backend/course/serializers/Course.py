from rest_framework import serializers
from course.models import Course
from assessment.serializers.Assessment import AssessmentSerializer
from assessment.models import Assessment

class CourseSerializer(serializers.ModelSerializer):
    queryset = Course.objects.all()
    name = serializers.CharField()
    description = serializers.CharField()
    user = serializers.CharField()
    grade = serializers.FloatField()

    assessment = AssessmentSerializer(many=True)

    class Meta:
        model=Course
        fields = ('name', 'description', 'grade', 'user', 'assessment')
        
    def create(self, validated_data):
        assessments_data = validated_data.pop('assessment')
        course = Course.objects.create(**validated_data)
        for assessment_data in assessments_data:
            Assessment.objects.create(course=course, **assessment_data)
        return course

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance
    
