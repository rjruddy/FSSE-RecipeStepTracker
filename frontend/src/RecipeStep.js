import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RECIPE_STEPS, UPDATE_RECIPE_STEP, DELETE_RECIPE_STEP } from './Operations';

export default function RecipeStep({ stepId, stepText, stepCompleted, filter }) {

  const [isCompleted, setCompleted] = useState(stepCompleted);
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState("");


  const [ deleteRecipeStep, {data: deleteData, loading: deleteLoading, error: deleteError} ] = useMutation(DELETE_RECIPE_STEP,
    {refetchQueries: [
      GET_RECIPE_STEPS,
      "GetRecipeSteps"
    ]});

  const [ updateRecipeStep, {data: updateData, loading: updateLoading, error: updateError} ] = useMutation(UPDATE_RECIPE_STEP);

  if (deleteError) return <p>Error : {deleteError.message}</p>;
  if (updateError) return <p>Error : {updateError.message}</p>;

  const handleSave = () => {
    //send Update API call with newText value
    updateRecipeStep({variables: {completed: false, step: newText, id: stepId}});
    //set isEditing to false
    setEditing(false);
    setNewText("");
  }

  const handleCancel = () => {
    setNewText("");
    setEditing(false);
  }

  const handleCompleted = () => {
    updateRecipeStep({variables: {completed: !isCompleted, step: stepText, id: stepId}});
    setCompleted(!isCompleted);
  }

  return (
    <li>
      {isEditing ? (
          <div>
            <input type="text" value={newText}  onInput={(e) => {
              setNewText(e.target.value);
            }}/>
            <button id="red" onClick={() => handleCancel()}> 
              Cancel
            </button>
            <button id="green" onClick={() => handleSave()}>
              Save
            </button>
          </div>
        ) : (
          <div>
            <label style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
              {stepText}
            </label>
            <input type="checkbox" defaultChecked={stepCompleted} onClick={() => handleCompleted()} />{' '}
            <br />
            <button id="red" onClick={() => deleteRecipeStep({variables: {id: stepId}})}> 
              Delete
            </button>
            <button id="green" onClick={() => setEditing(true)}>
              Edit
            </button>
          </div>
        )}
    </li>
  );
}
