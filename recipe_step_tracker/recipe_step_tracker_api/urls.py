from django.urls import path
from .views import (
    RecipeStepsApiView
)

urlpatterns = [
    path('recipe-steps', RecipeStepsApiView.as_view()),
    path('recipe-steps/<int:pk>', RecipeStepsApiView.as_view(), name="recipe-step-edit") #need user to pass in step id to be able to edit
]