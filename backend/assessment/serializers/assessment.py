from rest_framework import serializers
from assessment.models import Assessment
from task.serializers.task import TaskIdSerializer

class AssessmentSerializer(serializers.ModelSerializer):
    tasks = TaskIdSerializer(many=True, read_only=True)
    class Meta:
        model=Assessment
        fields = '__all__'

class AssessmentIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ['id']