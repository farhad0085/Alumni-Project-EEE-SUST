from rest_framework import serializers
from user.serializers import AddressSerializer, UserAccountSerializer
from django.contrib.auth import get_user_model
from .models import Address, Alumni, Batch, Picture


UserModel = get_user_model()


class AlumniSerializer(serializers.ModelSerializer):

    user = UserAccountSerializer(read_only=True)
    
    class Meta:
        model = Alumni
        fields = "__all__"
        depth = 1


class BatchSerializer(serializers.ModelSerializer):
    total_alumnies = serializers.SerializerMethodField()
    class Meta:
        model = Batch
        fields = "__all__"
        depth = 1

    def get_total_alumnies(self, obj):
        return Alumni.objects.filter(batch=obj).count()


class AlumniProfileUpdateSerializer(serializers.Serializer):

    full_name = serializers.CharField()
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

    def save(self, user_obj):
        splitted_name = self.validated_data.get('full_name', '').split(" ")
        if len(splitted_name) == 1:
            first_name = splitted_name[0]
        else:
            first_name = splitted_name[0]
            splitted_name.pop(0)
            last_name = " ".join(splitted_name)
        
        user_obj.first_name = first_name
        user_obj.last_name = last_name
        user_obj.save()

        alumni_obj = Alumni.objects.filter(user=user_obj).first()

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

        if not alumni_obj:

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
        
        else:
            if profile_picture:
                profile_picture_obj = Picture.objects.create(
                    picture=profile_picture
                )
            else:
                profile_picture_obj = None

            alumni_obj.present_address.address = present_address.get("address")
            alumni_obj.present_address.state = present_address.get("state")
            alumni_obj.present_address.city = present_address.get("city")
            alumni_obj.present_address.country = present_address.get("country")
            alumni_obj.present_address.zip_code = present_address.get("zip_code")
            alumni_obj.present_address.save()

            alumni_obj.permanent_address.address = permanent_address.get("address")
            alumni_obj.permanent_address.state = permanent_address.get("state")
            alumni_obj.permanent_address.city = permanent_address.get("city")
            alumni_obj.permanent_address.country = permanent_address.get("country")
            alumni_obj.permanent_address.zip_code = permanent_address.get("zip_code")
            alumni_obj.permanent_address.save()

            alumni_obj.name = full_name
            alumni_obj.date_of_birth = date_of_birth
            alumni_obj.registration_number = registration_number
            alumni_obj.batch = batch
            alumni_obj.graduation_year = graduation_year
            alumni_obj.is_employed = is_employed
            alumni_obj.email = email
            alumni_obj.contact_number = contact_number
            alumni_obj.company = company
            alumni_obj.designation = designation
            alumni_obj.biography = biography
            if profile_picture_obj:
                alumni_obj.profile_picture = profile_picture_obj
            alumni_obj.save()

        return alumni_obj
    
    def validate_batch(self, batch):
        batch_obj = Batch.objects.filter(id=batch).first()
        if not batch_obj:
            raise serializers.ValidationError("Invalid batch selected")
        return batch_obj
    
    def validate_registration_number(self, registration_number):
        user = self.context["request"].user
        alumni_obj = Alumni.objects.filter(registration_number=registration_number).exclude(user=user).first()
        if alumni_obj:
            raise serializers.ValidationError("A user with this registration number already exists")
        return registration_number

