from account.admin import User 
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator
import re

class SignupSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=20, min_length=4, required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'password2')
        extra_kwargs = {'username': {'validators': [UniqueValidator(queryset=User.objects.all())]}}
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['first_name'].required = False
        self.fields['last_name'].required = False
    
    def create(self, data):
        currUser = User.objects.create_user(
            username=data['username'], 
            email=data['email'], 
            first_name= "" if 'first_name' not in data else data['first_name'],
            last_name= "" if 'last_name' not in data else data['last_name'],
            password=data['password']
        )
        currUser.set_password(data['password'])
        currUser.save()
        return currUser
    
    def validate_password(self, password):
        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long")
        regex = re.compile('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$')
        if not regex.match(password):
            raise ValidationError(
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        return password
    
    def validate_password2(self, password2):
        if password2 != self.initial_data['password']:
            raise ValidationError("Passwords do not match")
        return password2
    
    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already exists")
        regex = re.compile('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
        if not regex.match(email):
            raise ValidationError("Email is not valid")
        return email