from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from course.serializers.course_form import CourseFormSerializer

class CreateCourseAPIView(generics.CreateAPIView):
    serializer_class = CourseFormSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)