from django.urls import path
from task.views.create_task import CreateTaskAPIView
from task.views.task import TaskView, AssessmentTaskListView

urlpatterns = [
    path('<int:pk>/create/', CreateTaskAPIView.as_view()),
    path('task/<int:pk>/', TaskView.as_view()),
    path('<int:pk>/tasks/', AssessmentTaskListView.as_view()),
]
