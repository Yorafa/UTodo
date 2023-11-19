from django.shortcuts import render
from account.serializers.signin import SigninSerializer
from account.serializers.signup import SignupSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
class SigninView(generics.CreateAPIView):
    serializer_class = SigninSerializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    
class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("You have successfully signed up", status=201)
        else:
            return Response(serializer.errors, status=400)

class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        liked_courses = user.liked_courses.all()
        liked_courses_data = [{'name': str(course.user.id)+course.name} for course in liked_courses]

        response_data = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'liked_courses': liked_courses_data,
        }

        return Response(response_data, status=status.HTTP_200_OK)
        