from django.contrib import admin
from .models import Assessment
from task.admin import TaskInline
# Register your models here.

class AssessmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'assessment_type', 'grade_now', 'grade_total', 'course')
    list_filter = ('assessment_type', 'course__name')
    search_fields = ('course__name',)
    inlines = [TaskInline]
    
    def assessment(self, obj):
        return str(obj)

class AssessmentInline(admin.TabularInline):
    model = Assessment

admin.site.register(Assessment, AssessmentAdmin)