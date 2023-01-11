from django.contrib import admin
from .models import Assessment
from task.admin import TaskInline
# Register your models here.

class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('assessment', 'course_id', 'course')
    inlines = [TaskInline]
    
    def assessment(self, obj):
        return str(obj)

class AssessmentInline(admin.TabularInline):
    model = Assessment

admin.site.register(Assessment, AssessmentAdmin)