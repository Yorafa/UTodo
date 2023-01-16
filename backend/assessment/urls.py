from django.urls import path
from django.urls.conf import include
from assessment.views import AssessmentDetailView

urlpatterns = [
    path("assessment/", include("task.urls")),
    path("assessment/<int:pk>", AssessmentDetailView.as_view())
]
