from django_filters import rest_framework as filters
from .models import Alumni


class AlumniFilter(filters.FilterSet):
    class Meta:
        model = Alumni
        fields = {
            'name': ['exact'],
            'birth_of_date': ['exact', 'lt', 'gt', 'lte', 'gte'],
            'session': ['exact'],
            'passing_year': ['exact'],
            'is_employed': ['exact'],
            'email': ['exact'],
            'contact_number': ['exact'],
            'company': ['exact'],
            'designation': ['exact'],
            'biography': ['exact'],
            'pictures': ['exact'],
            'profile_picture': ['exact'],
            'is_featured': ['exact'],
        }
