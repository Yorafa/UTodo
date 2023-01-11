from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from course.admin import CourseInline

# Register your models here.

class NewUserAdmin(UserAdmin):
    inlines = (CourseInline,)

# unregister old user admin
admin.site.unregister(User)
# register new user admin
admin.site.register(User, NewUserAdmin)