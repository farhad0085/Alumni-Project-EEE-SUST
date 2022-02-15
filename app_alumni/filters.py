from django_filters import rest_framework as filters
from .models import Alumni, Batch


class AlumniFilter(filters.FilterSet):
    class Meta:
        model = Alumni
        fields = {
            'name': ['exact'],
            'birth_of_date': ['exact', 'lt', 'gt', 'lte', 'gte'],
            'batch': ['exact'],
            'batch__session': ['exact'],
            'graduation_year': ['exact'],
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


class BatchFilter(filters.FilterSet):
    class Meta:
        model = Batch
        fields = {
            'batch_name': ['exact'],
            'session': ['exact'],
        }
