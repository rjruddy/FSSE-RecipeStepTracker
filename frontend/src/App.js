import React, { useState } from 'react';
import RecipeStep from './RecipeStep';
import './style.css';
import { useQuery, useMutation } from '@apollo/client';
import { GET_RECIPE_STEPS, CREATE_RECIPE_STEP } from './Operations';

export default function App() {
  // Add states for tracking input and recipe steps
  const [input, setInput] = useState('');
  const [onlyCompleted, setOnlyCompleted] = useState(false);
  const [onlyNotCompleted, setOnlyNotCompleted] = useState(false);
  const [filter, setFilter] = useState(null);


  const { data: getData, loading: getLoading, error: getError, refetch } = useQuery(GET_RECIPE_STEPS, {
    variables: { completed: filter !== null ? filter : undefined },
  });
  const [ createRecipeStep, {data: createData, loading: createLoading, error: createError} ] = useMutation(CREATE_RECIPE_STEP,
    {refetchQueries: [
      GET_RECIPE_STEPS,
      "GetRecipeSteps"
    ]});

  if (getLoading) return <p>Loading...</p>;
  if (getError) return <p>Error : {getError.message}</p>;
  if (createLoading) return <p>Processing...</p>;
  if (createError) return <p>Error : {createError.message}</p>;

  const handleCompletedFilter = () => {
    //ensure no longer filtering on not completed
    setOnlyNotCompleted(false);
    if (!onlyCompleted) {
      setFilter(true);
      refetch({completed: true});
    } else {
      setFilter(null);
    }
    //reverse current state of completed (done last to account for timing delays)
    setOnlyCompleted(!onlyCompleted);
  }

  const handleNotCompletedFilter = () => {
    setOnlyCompleted(false);
    if (!onlyNotCompleted) {
      setFilter(false);
      console.log("Refetching with completed as false, and current filter value:", filter);
      refetch({completed: false});
    } else {
      setFilter(null);
    }
    //reverse current state of not completed (done last to account for timing delays)
    setOnlyNotCompleted(!onlyNotCompleted);
  }

  const handleClearFilter = () => {
    setOnlyNotCompleted(false);
    setOnlyCompleted(false);
    setFilter(null)
    refetch({completed: null});
  }

  return (
    <div>
      <header>
        <h1>Recipe Step Tracker</h1>
      </header>

      <main>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createRecipeStep({variables: {completed: false, step: input}});
            setInput('');
          }}
        >
          <label htmlFor="recipe-step">Add task:</label>
          <textarea
            type="text"
            id="recipe-step"
            name="step"
            rows="3"
            value={input}
            onInput={(e) => {
              setInput(e.target.value);
            }}
          ></textarea>
          <button id="add-btn" type="submit">
            Add
          </button>
        </form>
        <div id="filter">
          <span>Filtering by: {onlyCompleted ? "Completed" : ""} {onlyNotCompleted ? "Not Completed" : ""}</span> <br></br>
          <button id="completed" onClick={() => handleCompletedFilter()}>Completed</button>
          <button id="noncompleted" onClick={() => handleNotCompletedFilter()}>Not Completed</button>
          <button id="clearfilter" onClick={() => handleClearFilter()}>Clear Filter</button>
        </div>

        <ol>
          {getData.stepList.map(step => (
            <span key={step.id}>
              <RecipeStep stepId={step.id} stepText={step.step} stepCompleted={step.completed} filter={filter}/>
            </span>
          ))}
        </ol>
      </main>
    </div>
  );
}
