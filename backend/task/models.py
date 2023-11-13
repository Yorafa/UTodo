from django.db import models
from assessment.models import Assessment
from django.core.exceptions import ValidationError
from django.db.models.signals import post_delete
from django.dispatch import receiver

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    due_date = models.DateTimeField()
    grade_now = models.FloatField(default=0.0)
    grade_total = models.FloatField(default=0.0)
    description = models.TextField(blank=True, null=True)
    is_counted = models.BooleanField(default=True)
    
    assessment = models.ForeignKey(Assessment, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.assessment.grade_total + self.grade_total > 100:
            raise ValidationError("Total grade of task exceeds 100.")
        elif self.assessment.grade_now + self.grade_now > 100:
            raise ValidationError("Current grade of task exceeds 100.")
        elif self.grade_total < self.grade_now:
            raise ValidationError("Total grade of this task is less than current grade.")
        super().save(*args, **kwargs)
        self.assessment.update_grade()
    
@receiver(post_delete, sender=Task)
def assessment_post_delete(sender, instance, **kwargs):
    instance.assessment.update_grade()