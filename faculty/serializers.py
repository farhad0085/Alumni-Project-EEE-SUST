from rest_framework import serializers
from faculty.models import Faculty, Lab, Project


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


class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
