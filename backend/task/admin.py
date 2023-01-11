from django.contrib import admin
from .models import Task
# Register your models here.

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'due_date', 'grade', 'assessment_id', 'assessment')

class TaskInline(admin.TabularInline):
    model = Task

admin.site.register(Task, TaskAdmin)