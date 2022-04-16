from rest_framework import serializers
from django.contrib.auth import get_user_model
from app_alumni.models import Address, Alumni, Batch, Picture

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
    full_name = serializers.CharField()
    password1 = serializers.CharField()
    password2 = serializers.CharField()
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
    profile_picture = serializers.ImageField(required=False, allow_empty_file=True)
    present_address = AddressSerializer()
    permanent_address = AddressSerializer()

    def validate(self, attrs):
        if attrs.get("password1") != attrs.get("password2"):
            raise serializers.ValidationError({'password2': "Two password didn't match"})

        return super().validate(attrs)
    

    def validate_email(self, email):
        if UserModel.objects.filter(email=email).exists():
            raise serializers.ValidationError("A user already exists with this email address")
        return email


    def save(self):
        splitted_name = self.validated_data.get('full_name', '').split(" ")
        if len(splitted_name) == 1:
            first_name = splitted_name[0]
        else:
            first_name = splitted_name[0]
            splitted_name.pop(0)
            last_name = " ".join(splitted_name)
        
        username = self.validated_data.get("username")
        password1 = self.validated_data.get("password1")
        full_name = self.validated_data.get("full_name")
        email = self.validated_data.get("email")
        date_of_birth = self.validated_data.get("date_of_birth")
        registration_number = self.validated_data.get("registration_number")
        batch = self.validated_data.get("batch")
        graduation_year = self.validated_data.get("graduation_year")
        is_employed = self.validated_data.get("is_employed")
        contact_number = self.validated_data.get("contact_number")
        company = self.validated_data.get("company")
        designation = self.validated_data.get("designation")
        biography = self.validated_data.get("biography")
        profile_picture = self.validated_data.get("profile_picture")
        present_address = self.validated_data.get("present_address")
        permanent_address = self.validated_data.get("permanent_address")

        user_obj = UserModel.objects.create_user(
            username=username or self._generate_username(),
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password1
        )
        user_obj.save()

        present_address_obj = Address.objects.create(
            address=present_address.get("address"),
            state=present_address.get("state"),
            city=present_address.get("city"),
            country=present_address.get("country"),
            zip_code=present_address.get("zip_code"),
        )
        permanent_address_obj = Address.objects.create(
            address=permanent_address.get("address"),
            state=permanent_address.get("state"),
            city=permanent_address.get("city"),
            country=permanent_address.get("country"),
            zip_code=permanent_address.get("zip_code"),
        )

        if profile_picture:
            profile_picture_obj = Picture.objects.create(
                picture=profile_picture
            )
        else:
            profile_picture_obj = None

        # create alumni
        alumni_obj = Alumni.objects.create(
            name=full_name,
            date_of_birth=date_of_birth,
            registration_number=registration_number,
            batch=batch,
            graduation_year=graduation_year,
            is_employed=is_employed,
            email=email,
            contact_number=contact_number,
            company=company,
            designation=designation,
            biography=biography,
            profile_picture=profile_picture_obj,
            present_address=present_address_obj,
            permanent_address=permanent_address_obj,
            user=user_obj,
        )
        return user_obj, alumni_obj
    
    def validate_username(self, username):
        if not username:
            return self._generate_username()
        return username

    def validate_batch(self, batch):
        batch_obj = Batch.objects.filter(id=batch).first()
        if not batch_obj:
            raise serializers.ValidationError("Invalid batch selected")
        return batch_obj
    
    def validate_registration_number(self, registration_number):
        print(registration_number)
        alumni_obj = Alumni.objects.filter(registration_number=registration_number).first()
        if alumni_obj:
            raise serializers.ValidationError("A user with this registration number already exists")
        return registration_number
