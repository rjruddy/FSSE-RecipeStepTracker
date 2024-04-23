from django.db import models

# Create your models here.
class RecipeStep(models.Model):
    # Add fields to hold step and completed
    step = models.CharField(max_length=500)
    completed = models.BooleanField(default=False, blank=True)

    #we don't need __init__ because we don't need to instantiate this.

    def __str__(self):
        return self.task
