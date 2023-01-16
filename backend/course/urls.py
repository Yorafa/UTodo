from django.urls import path
from django.urls.conf import include
from .views.detail import CourseDetailView
from .views.course_list import CourseList

urlpatterns = [
    # path("course/", include("assessment.urls")),
    path("<int:pk>/", CourseDetailView.as_view()),
    path("all/", CourseList.as_view()),
]
