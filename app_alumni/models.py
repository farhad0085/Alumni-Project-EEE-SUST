from django.db import models
from common.models import TrackingModel


class Alumni(TrackingModel):
    name = models.CharField(max_length=200)
    birth_of_date = models.DateField(blank=True, null=True, help_text="Format: YYYY-MM-DD")
    session = models.CharField(max_length=10, help_text="Eg: 2012-13")
    passing_year = models.CharField(max_length=10)
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

    def __str__(self) -> str:
        return self.name


class Picture(TrackingModel):
    picture = models.ImageField(upload_to="pictures")

    def __str__(self) -> str:
        return self.picture.url


class Address(TrackingModel):
    address = models.TextField(blank=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self) -> str:
        return str(self.id)
