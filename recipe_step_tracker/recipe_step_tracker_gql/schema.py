#Contents of this file inspired by and referencing https://medium.com/simform-engineering/empowering-your-django-backend-with-graphql-a-powerful-combination-764babd30bb0 
import graphene
from graphene_django import DjangoObjectType #tranforming django object into GraphQL readable format
from .models import RecipeStep

class RecipeStepType(DjangoObjectType):
    #add some metadata here!
    class Meta:
        model = RecipeStep
        fields = "__all__"

# GET
class Query(graphene.ObjectType):
    step_list = graphene.List(RecipeStepType, completed=graphene.Boolean())
    def resolve_step_list(self, info, completed=None):
        #completed is either true, false, or None. -- for filter functionality on frontend
        if completed is not None:
            return RecipeStep.objects.all().filter(completed=completed);
        return RecipeStep.objects.all()
    
# CREATE
class CreateRecipeStep(graphene.Mutation):
    class Arguments:
        #both arguments are required!
        step = graphene.String(required=True)
        completed = graphene.Boolean(required=True)

    step = graphene.Field(RecipeStepType)

    def mutate(self, info, step, completed):
        new_step = RecipeStep.objects.create(step=step, completed=completed)
        new_step.save()
        return CreateRecipeStep(step=new_step)
    
# UPDATE
class UpdateRecipeStep(graphene.Mutation):
    class Arguments:
        #all arguments are required!
        id = graphene.ID(required=True)
        step = graphene.String(required=True)
        completed = graphene.Boolean(required=True)

    renewedstep = graphene.Field(RecipeStepType)

    def mutate(self, info, id, step, completed):
        try:
            renewedstep = RecipeStep.objects.get(pk=id)
        except:
            raise Exception("No such step found. ")
        
        renewedstep.step = step
        renewedstep.completed = completed
        renewedstep.save()
        return UpdateRecipeStep(renewedstep=renewedstep)
    
# DELETE
class DeleteRecipeStep(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    success = graphene.Boolean()
    step = graphene.Field(RecipeStepType)

    def mutate(self, info, id):
        try:
            step = RecipeStep.objects.get(pk=id)
        except:
            raise Exception("Step not found")
        
        step.delete()
        return DeleteRecipeStep(step=step)

class Mutation(graphene.ObjectType):
    create_recipe_step = CreateRecipeStep.Field()
    update_recipe_step = UpdateRecipeStep.Field()
    delete_recipe_step = DeleteRecipeStep.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)