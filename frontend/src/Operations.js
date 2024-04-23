import { gql } from '@apollo/client';

//-----------------------------GQL Statements-----------------------------------
//GET
//Necessary inputs: none
export const GET_RECIPE_STEPS = gql`
  query GetRecipeSteps($completed: Boolean) {
    stepList(completed: $completed) {
      completed
      id
      step
    }
  }
` 

//CREATE
//Necessary inputs: completed (boolean), step (string)
export const CREATE_RECIPE_STEP = gql`
    mutation CreateRecipeStep($completed: Boolean!, $step: String!) {
        createRecipeStep(completed: $completed, step: $step) {
            step {
                completed
                step
                id
            }
        }
    }
`
//UPDATE
//Necessary inputs: completed (boolean), step (string), id (integer) -- this be the bastard
export const UPDATE_RECIPE_STEP = gql`
    mutation UpdateRecipeStep($completed: Boolean!, $step: String!, $id: ID!) {
        updateRecipeStep(completed: $completed, step: $step, id: $id) {
            renewedstep {
                completed
                step
                id
            }
        }
    }
`
//DELETE
//Necessary input: id (integer)
export const DELETE_RECIPE_STEP = gql`
    mutation DeleteRecipeStep($id: ID!)  {
        deleteRecipeStep(id: $id) {
            success
        }
    }
`

//-----------------------------Export Functions-----------------------------------
// export function createRecipeStep(completed, step) {
//     const [createRecipeStep, {data, loading, error}] = useMutation(CREATE_RECIPE_STEP);

//     if (loading) return 'Submitting...';
//     if (error) return `Submission error! ${error.message}`;

//     createRecipeStep(completed, step);
// }
