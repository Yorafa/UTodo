from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from course.models import Course
from course.serializers.course import CourseSerializer
from rest_framework import status
from rest_framework.response import Response


class CourseView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        course_id = self.kwargs['pk']
        course = Course.objects.get(id=course_id)

        if course.is_public or course.user == user:
            return Course.objects.filter(id=course_id)
        else:
            return Course.objects.none()
    
    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.user != request.user:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.user != request.user:
            return Response({"detail": "Permission denied."}, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
class OwnCourseListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = None

    def get_queryset(self):
        return Course.objects.filter(user=self.request.user)