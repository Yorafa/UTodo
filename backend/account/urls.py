from rest_framework_simplejwt.views import TokenObtainPairView
from django.urls import path
from account.views import SigninView, SignupView, SignoutView, ProfileView
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('signout/', SignoutView.as_view(), name='signout'),
    path('profile/', ProfileView.as_view(), name='profile'),
]