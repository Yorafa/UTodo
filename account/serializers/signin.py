from account.admin import User
from django.contrib.auth import authenticate
from rest_framework import serializers

class SigninSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=20, min_length=4, required=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'username': {'validators': []}}
        
    def validate(self, data):
        username = data['username']
        password = data['password']
        currUser = authenticate(username=username, password=password)
        if currUser is None:
            raise serializers.ValidationError('Invalid username or password')
        data['user'] = currUser
        return data
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].required = True
        self.fields['password'].required = True