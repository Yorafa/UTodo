from rest_framework import serializers
from assessment.models import Assessment

class AssessmentSerializer(serializers.ModelSerializer):
    atype = serializers.CharField()
    course = serializers.CharField()
    grade = serializers.FloatField()
    count = serializers.IntegerField()

    class Meta:
        model=Assessment
        fields = ('atype', 'course', 'grade', 'count')
        
    def create(self, validated_data):
        return Assessment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.atype = validated_data.get('atype', instance.atype)
        instance.course = validated_data.get('course', instance.course)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.count = validated_data.get('count', instance.count)
        instance.save()
        return instance
    
