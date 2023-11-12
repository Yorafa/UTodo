from django.db import models
from course.models import Course
from django.core.exceptions import ValidationError
from django.db.models.signals import post_delete
from django.dispatch import receiver

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
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assessments')

    def save(self, *args, **kwargs):
        if self.course.grade_total + self.grade_total > 100:
            raise ValidationError("Total grade of assessments exceeds 100.")
        elif self.course.grade_now + self.grade_now > 100:
            raise ValidationError("Current grade of assessments exceeds 100.")
        elif self.grade_total < self.grade_now:
            raise ValidationError("Total grade of assessments is less than current grade.")
        super().save(*args, **kwargs)
        self.course.update_grade()
    

    def __str__(self):
        return str(self.course) + ' ' + self.get_assessment_type_display()

    def update_grade(self):
        tasks = self.tasks.all()
        total_now = 0
        total = 0
        for task in tasks:
            if task.is_counted:
                total += task.grade_total
                total_now += task.grade_now
        self.grade_now = total_now
        self.grade_total = total
        self.save()
        self.course.update_grade()

@receiver(post_delete, sender=Assessment)
def assessment_post_delete(sender, instance, **kwargs):
    instance.course.update_grade()
