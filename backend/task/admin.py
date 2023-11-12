from django.contrib import admin
from task.models import Task
# Register your models here.

class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'due_date', 'grade_now', 'grade_total', 'is_counted', 'assessment')
    list_filter = ('due_date', 'is_counted', 'assessment__assessment_type')
    search_fields = ('title', 'assessment__course__name')

class TaskInline(admin.TabularInline):
    model = Task

admin.site.register(Task, TaskAdmin)