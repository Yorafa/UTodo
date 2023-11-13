from django.urls import path
from django.urls.conf import include
from assessment.views.assessment import AssessmentView, CourseAssessmentListView
from assessment.views.create_assessment import CreateAssessmentAPIView

urlpatterns = [
    path("assessment/<int:pk>/", AssessmentView.as_view()),
    path("<int:pk>/assessments/", CourseAssessmentListView.as_view()),
    path("<int:pk>/create/", CreateAssessmentAPIView.as_view()),
    path('assessment/', include('task.urls')),
]
