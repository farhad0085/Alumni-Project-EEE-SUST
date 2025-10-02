from django.db import models
from tinymce.models import HTMLField


class Faculty(models.Model):
    ROLE_CHOICES = (
        ("head", "Department Head"),
        ("faculty", "Faculty Member"),
        ("staff", "Office Staff"),
    )

    GENDER_CHOICES = (
        ("male", "Male"),
        ("female", "Female"),
    )

    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    photo = models.ImageField(upload_to="faculty/photos", null=True, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="faculty")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    description = HTMLField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.get_role_display()})"
    
    class Meta:
        verbose_name_plural = "Faculties"

