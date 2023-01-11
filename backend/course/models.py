from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.

class Course(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name