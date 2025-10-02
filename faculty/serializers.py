from rest_framework import serializers
from .models import Faculty


class FacultySerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source="get_role_display", read_only=True)

    class Meta:
        model = Faculty
        fields = [
            "id",
            "name",
            "designation",
            "email",
            "phone",
            "photo",
            "role",
            "role_display",
            "gender",
            "description",
        ]
