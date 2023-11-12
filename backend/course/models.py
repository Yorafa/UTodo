from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

SEMESTER_CHOICES = (
    ('Fall', 'Fall'),
    ('Winter', 'Winter'),
    ('Summer', 'Summer'),
)

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    university = models.CharField(max_length=100, default='University of Toronto')
    grade_now = models.FloatField(default=0.0)
    grade_total = models.FloatField(default=0.0)
    year = models.IntegerField(default=datetime.now().year)
    semester = models.CharField(max_length=6, choices=SEMESTER_CHOICES, default='Fall')
    is_public = models.BooleanField(default=False)
    is_show_grade = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.user.username + '\'s ' + self.name
    
    def update_grade(self):
        assessments = self.assessments.all()
        total_now = 0
        total = 0
        for assessment in assessments:
            if assessment.is_counted:
                total += assessment.grade_total
                total_now += assessment.grade_now
        self.grade_now = total_now
        self.grade_total = total
        self.save()