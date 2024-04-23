from django.db import models

# Create your models here. -- tentative copy of REST model
class RecipeStep(models.Model):
    # Add fields to hold step and completed
    # id = models.AutoField(primary_key=True)
    step = models.CharField(max_length=500)
    completed = models.BooleanField(default=False, blank=True)

    #we don't need __init__ because we don't need to instantiate this.

    def __str__(self):
        return self.step
