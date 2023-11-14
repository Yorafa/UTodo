from rest_framework import generics, permissions
from course.models import Course
from course.serializers.public_course_list import PublicCourseListSerializer

class PublicCourseListView(generics.ListAPIView):
    queryset = Course.objects.filter(is_public=True)
    serializer_class = PublicCourseListSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = None