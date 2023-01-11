from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime

User = get_user_model()
# Create your models here.
SEMESTER_CHOICES = (
    ('Fall', 'Fall'),
    ('Winter', 'Winter'),
    ('Summer', 'Summer'),
)

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')
    grade = models.FloatField(default=0.0)
    year = models.IntegerField(default=datetime.now().year)
    semester = models.CharField(max_length=6, choices=SEMESTER_CHOICES, default='Fall')

    def __str__(self):
        return self.user.username + '\'s ' + self.name 