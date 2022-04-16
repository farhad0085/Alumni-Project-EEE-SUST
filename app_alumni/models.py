from django.db import models
from app_alumni.validators import BatchSessionValidator, RegistrationNumberValidator
from common.models import TrackingModel
from django.utils.safestring import mark_safe
from user.models import UserAccount


class Batch(TrackingModel):
    batch_name = models.CharField(max_length=200)
    session = models.CharField(max_length=10, unique=True, validators=[BatchSessionValidator()], help_text="Eg: 2012-13")
    total_students = models.IntegerField(default=0)
    batch_pictures = models.ManyToManyField('Picture', blank=True, related_name="+")

    def __str__(self):
        return self.session


class Alumni(TrackingModel):
    name = models.CharField(max_length=200)
    date_of_birth = models.DateField(blank=True, null=True, help_text="Format: YYYY-MM-DD")
    registration_number = models.CharField(max_length=10, validators=[RegistrationNumberValidator()], unique=True, null=True)
    batch = models.ForeignKey(Batch, on_delete=models.SET_NULL, null=True)
    graduation_year = models.CharField(max_length=4)
    is_employed = models.BooleanField(default=True)
    email = models.EmailField(blank=True, null=True)
    contact_number = models.CharField(max_length=20, blank=True, null=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    designation = models.CharField(max_length=500, blank=True, null=True)
    biography = models.TextField(blank=True)
    pictures = models.ManyToManyField('Picture', blank=True, related_name="alumnis")
    profile_picture = models.ForeignKey('Picture', related_name="dp_alumnis", on_delete=models.SET_NULL, blank=True, null=True)
    is_featured = models.BooleanField(default=False, help_text="Show in homepage or not.")
    present_address = models.ForeignKey('Address', on_delete=models.SET_NULL, null=True, blank=True, related_name="present_address")
    permanent_address = models.ForeignKey('Address', on_delete=models.SET_NULL, null=True, blank=True, related_name="permanent_address")
    is_active = models.BooleanField(default=False)
    user = models.OneToOneField(UserAccount, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class Picture(TrackingModel):
    picture = models.ImageField(upload_to="pictures")

    def image_preview(self):
        if self.picture:
            return mark_safe('<img src="{0}" width="150" height="150" />'.format(self.picture.url))
        else:
            return '(No image)'

    def __str__(self) -> str:
        if self.picture:
            return self.picture.url
        return str(self.id)


class Address(TrackingModel):
    address = models.TextField(blank=False, null=False)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return self.address
