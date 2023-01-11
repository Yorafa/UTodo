from django.shortcuts import render
from account.serializers.login import LoginSerializer
from account.serializers.signup import SignupSerializer
from account.serializers.Profile import ProfileSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import login, logout
from django.contrib.auth.models import User

# Create your views here.
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, *args, **kwargs):
        return Response("Welcome to the login page")
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        login(request, serializer.validated_data['user'])
        return Response("You have successfully logged in")
    
class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, *args, **kwargs):
        return Response("Welcome to the sign in page")
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("You have successfully signed in")
    
class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        return Response("Logout here")
    
    def post(self, request, *args, **kwargs):
        try:
            request.user.auth_token.delete()
        except AttributeError:
            pass
        logout(request)
        return Response("You have successfully logged out")

class ProfileView(APIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        try:
            user = User.objects.get(username=kwargs['username'])
            serializer = ProfileSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response("User does not exist")