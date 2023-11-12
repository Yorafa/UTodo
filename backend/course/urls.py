from django.urls import path
from django.urls import include
from course.views.course import CourseView, OwnCourseListView
from course.views.public_course_list import PublicCourseListView
from course.views.create_course import CreateCourseAPIView


urlpatterns = [
    path("<int:pk>/", CourseView.as_view()),
    path("public_all/", PublicCourseListView.as_view()),
    path("create/", CreateCourseAPIView.as_view()),
    path("my_all", OwnCourseListView.as_view()),
    path("", include('assessment.urls')),
]
