from django.contrib import admin
from course.models import Course
from assessment.admin import AssessmentInline
# Register your models here.

class CourseAdmin(admin.ModelAdmin):
    list_display = ('info', 'description', 'user')
    list_filter = ('user',)
    inlines = [AssessmentInline]
    
    def info(self, obj):
        return str(obj)

class CourseInline(admin.TabularInline):
    model = Course

admin.site.register(Course, CourseAdmin)