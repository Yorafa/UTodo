from rest_framework import serializers
from ..models import Task

class TaskSerializer(serializers.ModelSerializer):
    due_date = serializers.DateTimeField(format="%Y-%m-%d %H:%M")
    grade = serializers.IntegerField()
    title = serializers.CharField()
    is_chosen = serializers.BooleanField()

    class Meta:
        model=Task
        fields = ('due_date', 'grade', 'title', 'is_chosen')
        
    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.title = validated_data.get('title', instance.title)
        instance.is_chosen = validated_data.get('is_chosen', instance.is_chosen)
        instance.save()
        return instance
    