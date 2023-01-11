from django.contrib import admin
from .models import Course
from assessment.admin import AssessmentInline
# Register your models here.

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'user_id', 'user')
    inlines = [AssessmentInline]

class CourseInline(admin.TabularInline):
    model = Course

admin.site.register(Course, CourseAdmin)