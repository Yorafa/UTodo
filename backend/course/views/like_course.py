from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from course.models import Course

class LikeCourseAPIView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated]
    pagination_class = None
    
    def patch(self, request, *args, **kwargs):
        course = self.get_object()
        user = self.request.user

        if user in course.likes.all():
            return Response({'detail': 'You have already liked this course.'}, status=status.HTTP_400_BAD_REQUEST)

        course.likes.add(user)
        return Response({'detail': 'Course liked successfully.'}, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        course = self.get_object()
        return Response({'who likes': course.likes.all().values_list('username', flat=True)}, status=status.HTTP_200_OK)

class UnLikeCourseAPIView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        course = self.get_object()
        user = self.request.user

        if user not in course.likes.all():
            return Response({'detail': 'You have not liked this course.'}, status=status.HTTP_400_BAD_REQUEST)

        course.likes.remove(user)
        return Response({'detail': 'Course unliked successfully.'}, status=status.HTTP_200_OK)

