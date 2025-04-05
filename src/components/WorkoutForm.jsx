import { useState } from 'react'
import useWorkoutContext from '../hooks/useWorkoutContext'
import useAuthContext from '../hooks/useAuthContext';

const WorkoutForm = () => {
  
  const [error, setError] = useState(null);

  const {dispatch}= useWorkoutContext()
  const {user}=useAuthContext();
  async function handleSubmit(event){
    event.preventDefault();

    if(!user){
      setError('You Must be logged in');
      return;
    }
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // Convert 'load' and 'reps' to numbers
    data.load = parseFloat(data.load);
    data.reps = parseInt(data.reps, 10);

    const response = await fetch('http://localhost:3000/api/workouts/',{
        method: 'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const json = await response.json();
    if(!response.ok){
        setError(json.error)
    }
    if(response.ok){
        setError(null)
        console.log("new workout added",json);
        dispatch({type:'CREATE_WORKOUTS',payload:json});
    }

    event.target.reset();
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" name="title" required
      />

      <label>Load (in kg):</label>
      <input 
        type="number" name='load' required
      />

      <label>Number of Reps:</label>
      <input 
        type="number" name='reps' required
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm