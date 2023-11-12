from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from account.views import LoginView, SignupView, LogoutView, ProfileView
from django.urls import include
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('', include('course.urls')),
]