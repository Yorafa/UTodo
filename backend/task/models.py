from django.db import models
from assessment.models import Assessment

# Create your models here.

class Task(models.Model):
    due_date = models.DateTimeField()
    grade = models.IntegerField()
    title = models.CharField(max_length=200)
    
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.title