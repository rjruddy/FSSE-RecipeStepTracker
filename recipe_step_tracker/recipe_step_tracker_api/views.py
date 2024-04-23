from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RecipeStep
from .serializers import RecipeStepSerializer

class RecipeStepsApiView(APIView):
    #GET (List steps)
    def get(self, request):
        steps = RecipeStep.objects
        serializer = RecipeStepSerializer(steps, many=True) #many means more than one
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    #POST (Create a step)
    def post(self, request):
        data = {
            'step': request.data.get('step'),
            'completed': request.data.get('completed')
        }
        serializer = RecipeStepSerializer(data=data)

        if serializer.is_valid(): # is it a valid JSON?
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) # TRANSFER -- this is the data you sent!
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get_key(self, pk):
        try: return RecipeStep.objects.get(pk)
        except: return Response(status=status.HTTP_404_NOT_FOUND)
    
    #PUT (Update)
    def put(self, request, **kwargs): #pk is the step id passed into the url path.
        #identify which step needs to be edited.
        user_step_id = self.kwargs['pk']
        data = {
            'id': user_step_id,
            'step': request.data.get('step'),
            'completed': request.data.get('completed')
        }

        given_step = RecipeStep.objects.get(pk=user_step_id)

        serializer = RecipeStepSerializer(given_step, data=data)

        if serializer.is_valid(): # is it a valid JSON?
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    #DELETE: 
    def delete(self, request, **kwargs):
        #identify which step needs to be edited.
        user_step_id = self.kwargs['pk']
        data = {
            'id': user_step_id,
            'step': RecipeStep.objects.filter(id=user_step_id).get('step'),
            'completed': RecipeStep.objects.filter(id=user_step_id).get('completed'),
        }
        print("user step id: ", user_step_id)
        
        try:
            RecipeStep.objects.filter(id=user_step_id).delete()
            return Response(data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(data, status=status.HTTP_400_BAD_REQUEST)