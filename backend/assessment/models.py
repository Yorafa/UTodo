from django.db import models
from course.models import Course
# Create your models here.

ACCESS_CHOICES = (
    ('1', 'Term Test'),
    ('2', 'Asignments'),
    ('3', 'Projects'),
    ('4', 'Homework'),
    ('5', 'Quizzes'),
    ('6', 'Final Exam'),
    ('7', 'Others'),
)

class Assessment(models.Model):
    type = models.CharField(max_length=1, choices=ACCESS_CHOICES)
    other_type = models.CharField(max_length=100, blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        if self.type == '7':
            return self.other_type
        else:
            return self.get_type_display()
