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
    university = models.CharField(max_length=100, default='University of Toronto', blank=True)
    grade_now = models.FloatField(default=0.0, blank=True)
    grade_total = models.FloatField(default=0.0, blank=True)
    year = models.IntegerField(default=datetime.now().year, blank=True)
    semester = models.CharField(max_length=6, choices=SEMESTER_CHOICES, default='Fall')
    is_public = models.BooleanField(default=False)
    is_on_list = models.BooleanField(default=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    likes = models.ManyToManyField(User, related_name='liked_courses', blank=True)

    def __str__(self):
        return self.user.username + '\'s ' + self.name
    
    def update_grade(self):
        assessments = self.assessments.all()
        total_now = 0
        total = 0
        for assessment in assessments:
            total += assessment.weight
            if assessment.grade_total != 0 and assessment.is_counted:
                total_now += assessment.grade_now/assessment.grade_total * assessment.weight
        self.grade_now = total_now
        self.grade_total = total
        self.save()