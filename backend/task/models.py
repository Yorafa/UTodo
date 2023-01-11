from django.db import models
from assessment.models import Assessment

# Create your models here.

class Task(models.Model):
    created = models.DateTimeField()
    due_date = models.DateTimeField()
    grade = models.IntegerField()
    title = models.CharField(max_length=200)
    
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE)

    def __str__(self):
        return self.title