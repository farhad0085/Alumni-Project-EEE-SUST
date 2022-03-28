from rest_framework import serializers
from django.contrib.auth import get_user_model
from app_alumni.models import Address

from common.utils import GenerateUsername
from .models import UserAccount


UserModel: UserAccount = get_user_model()


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UserAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserAccount
        exclude = ['password', 'user_permissions', 'is_staff', 'is_superuser', 'groups']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class RegistrationSerializer(serializers.Serializer, GenerateUsername):

    username = serializers.CharField(required=False, allow_blank=True)
    full_name  = serializers.CharField()
    email = serializers.EmailField()
    date_of_birth = serializers.DateField(required=False)
    registration_number = serializers.RegexField(r"20[1-9][0-9]338[0-9]{3}", max_length=10, min_length=10)
    batch = serializers.IntegerField()
    graduation_year = serializers.CharField(max_length=4)
    is_employed = serializers.BooleanField(required=False)
    contact_number = serializers.CharField(required=False, allow_blank=True)
    company = serializers.CharField(required=False, allow_blank=True)
    designation = serializers.CharField(required=False, allow_blank=True)
    biography = serializers.CharField(required=False, allow_blank=True)
    profile_picture = serializers.ImageField(required=False)
    present_address = AddressSerializer()
    permanent_address = AddressSerializer()

    def save(self, request):
        splitted_name = self.validated_data.get('full_name', '').split(" ")
        if len(splitted_name) == 1:
            first_name = splitted_name[0]
        else:
            first_name = splitted_name[0]
            splitted_name.pop(0)
            last_name = " ".join(splitted_name)
        

    
    def validate_username(self, username):
        if not username:
            return self._generate_username()
        return username

