from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from assessment.serializers.assessment import AssessmentSerializer
from course.models import Course

class CreateAssessmentAPIView(generics.CreateAPIView):
    serializer_class = AssessmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        course = Course.objects.filter(id=self.kwargs['pk'], user=self.request.user)
        if not course.exists():
            raise PermissionDenied("You do not have permission to add assessment to this course.")
        serializer.save(course_id=self.kwargs['pk'])
