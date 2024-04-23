from rest_framework import serializers
from .models import RecipeStep

class RecipeStepSerializer(serializers.ModelSerializer):
    #add some metadata here!
    class Meta:
        #TODO: add the model field and the model fields to a fields list
        model = RecipeStep
        fields = ["id", "step", "completed"]