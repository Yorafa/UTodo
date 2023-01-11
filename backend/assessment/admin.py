from django.contrib import admin
from .models import Assessment
from task.admin import TaskInline
# Register your models here.

class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('atype', 'other_type', 'course_id', 'course')
    inlines = [TaskInline]

class AssessmentInline(admin.TabularInline):
    model = Assessment

admin.site.register(Assessment, AssessmentAdmin)