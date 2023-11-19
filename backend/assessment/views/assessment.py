from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from assessment.models import Assessment
from assessment.serializers.assessment import AssessmentSerializer
from rest_framework import status
from rest_framework.response import Response

class AssessmentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AssessmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        assessment_id = self.kwargs['pk']
        assessment = Assessment.objects.get(id=assessment_id)

        if assessment.course.user == user:
            return Assessment.objects.filter(id=assessment_id)
        else:
            return Assessment.objects.none()
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.course.user != request.user:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.course.user != request.user:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
class CourseAssessmentListView(generics.ListAPIView):
    serializer_class = AssessmentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return Assessment.objects.filter(course=self.kwargs['pk'])