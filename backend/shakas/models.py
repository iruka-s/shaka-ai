from django.db import models

# Create your models here.
class Shaka(models.Model):
    # user_id = models.CharField(max_length=200)
    key = models.CharField(max_length=60, default='')
    message = models.CharField(max_length=280)
    point = models.FloatField()

    def __str__(self):
        return self.message