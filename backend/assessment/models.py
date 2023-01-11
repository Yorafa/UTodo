from django.db import models
from course.models import Course
# Create your models here.

ACCESS_CHOICES = (
    ('1', 'Term Tests'),
    ('2', 'Assignments'),
    ('3', 'Projects'),
    ('4', 'Homework'),
    ('5', 'Quizzes'),
    ('6', 'Final Exam'),
    ('7', 'Others'),
)

class Assessment(models.Model):
    atype = models.CharField(max_length=1, choices=ACCESS_CHOICES)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.FloatField(default=1.0)
    count = models.IntegerField(default=1)

    def __str__(self):
        return str(self.course) + ' ' + self.get_atype_display()
