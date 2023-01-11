from django.db import models
from course.models import Course
# Create your models here.

ACCESS_CHOICES = (
    ('Term Tests', 'Term Tests'),
    ('Assignments', 'Assignments'),
    ('Projects', 'Projects'),
    ('Homework', 'Homework'),
    ('Quizzes', 'Quizzes'),
    ('Final Exam', 'Final Exam'),
    ('Others', 'Others'),
)

class Assessment(models.Model):
    atype = models.CharField(max_length=11, choices=ACCESS_CHOICES)
    grade = models.FloatField(default=1.0)
    count = models.IntegerField(default=1)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assessment')

    def __str__(self):
        return str(self.course) + ' ' + self.get_atype_display()
