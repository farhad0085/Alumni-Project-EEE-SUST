from rest_framework import serializers
from .models import Alumni, Batch


class AlumniSerializer(serializers.ModelSerializer):
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
