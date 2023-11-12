from django.shortcuts import render
from assessment.models import Assessment
from backend.assessment.serializers.assessment import AssessmentSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response

# Create your views here.

class AssessmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        try:
            assessment = Assessment.objects.get(pk=kwargs['pk'])
            serializer = AssessmentSerializer(assessment)
            return Response(serializer.data)
        except Assessment.DoesNotExist:
            return Response("Assessment does not exist")

    def put(self, request, *args, **kwargs):
        try:
            assessment = Assessment.objects.get(pk=kwargs['pk'])
            serializer = AssessmentSerializer(assessment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        except Assessment.DoesNotExist:
            return Response("Assessment does not exist")

    def delete(self, request, *args, **kwargs):
        try:
            assessment = Assessment.objects.get(pk=kwargs['pk'])
            assessment.delete()
            return Response("Assessment has been deleted")
        except Assessment.DoesNotExist:
            return Response("Assessment does not exist")
