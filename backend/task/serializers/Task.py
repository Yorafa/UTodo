from rest_framework import serializers
from ..models import Task

class TaskSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    due_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    grade = serializers.IntegerField()
    title = serializers.CharField()

    class Meta:
        model=Task
        fields = ('created', 'due_date', 'grade', 'title')
        
    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.created = validated_data.get('created', instance.created)  
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
    