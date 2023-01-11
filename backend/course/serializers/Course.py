from rest_framework import serializers
from course.models import Course

class CourseSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    user = serializers.CharField()
    grade = serializers.FloatField()

    class Meta:
        model=Course
        fields = ('name', 'description', 'grade', 'user')
        
    def create(self, validated_data):
        return Course.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.user = validated_data.get('user', instance.user)
        instance.save()
        return instance
    
