from django.urls import path
from django.urls.conf import include
from course.views import CourseDetailView
urlpatterns = [
    path("course/", include("assessment.urls")),
    path("course/<int:pk>", CourseDetailView.as_view()),
]
