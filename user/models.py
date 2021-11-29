from django.db import models
from django.contrib.auth.models import AbstractUser


class UserAccount(AbstractUser):
    """Custom user model for our system"""

    @property
    def full_name(self):
        name = self.get_full_name() or self.username
        return name
