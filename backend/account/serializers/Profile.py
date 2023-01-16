from rest_framework import serializers
from django.contrib.auth.models import User
from course.models import Course
from course.serializers.Course import CourseSerializer

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    
    courses = CourseSerializer(many=True)

    class Meta:
        model=User
        fields = ('username', 'courses')
        
    def create(self, validated_data):
        courses_data = validated_data.pop('course')
        profile = User.objects.create(**validated_data)
        for course_data in courses_data:
            Course.objects.create(profile=profile, **course_data)
        return profile

    def update(self, instance, validated_data):
        print("instance", instance)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.count = validated_data.get('count', instance.count)
        instance.save()
        return instance
    
