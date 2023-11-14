from django.shortcuts import render
from account.serializers.signin import SigninSerializer
from account.serializers.signup import SignupSerializer
from account.serializers.profile import ProfileSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
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
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = ProfileSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response("User does not exist") 