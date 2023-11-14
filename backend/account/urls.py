from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from account.views import SigninView, SignupView, ProfileView
urlpatterns = [
    path('token/refresh', TokenRefreshView.as_view()),
    path('signin/', SigninView.as_view(), name='signin'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('profile/', ProfileView.as_view(), name='profile'),
]