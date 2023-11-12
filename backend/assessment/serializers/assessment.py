from rest_framework import serializers
from assessment.models import Assessment
from task.serializers.task import TaskSerializer
from task.models import Task

class AssessmentSerializer(serializers.ModelSerializer):
    atype = serializers.CharField()
    grade = serializers.FloatField()
    count = serializers.IntegerField()

    tasks = TaskSerializer(many=True)

    class Meta:
        model=Assessment
        fields = ('atype', 'grade', 'count', 'tasks')
        
    def create(self, validated_data):
        tasks_data = validated_data.pop('task')
        assessment = Assessment.objects.create(**validated_data)
        for task_data in tasks_data:
            Task.objects.create(assessment=assessment, **task_data)
        return assessment

    def update(self, instance, validated_data):
        instance.grade = validated_data.get('grade', instance.grade)
        instance.count = validated_data.get('count', instance.count)
        instance.save()
        return instance
    
