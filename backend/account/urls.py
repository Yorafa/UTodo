from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from .views import LoginView, SigninView, LogoutView, RegisterView

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', LoginView.as_view(), name='login'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
]
