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
    id = models.AutoField(primary_key=True)
    assessment_type = models.CharField(max_length=11, choices=ACCESS_CHOICES)
    grade_now = models.FloatField(default=0.0)
    grade_total = models.FloatField(default=0.0)
    is_counted = models.BooleanField(default=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assessments')

    def __str__(self):
        return str(self.course) + ' ' + self.get_assessment_type_display()
