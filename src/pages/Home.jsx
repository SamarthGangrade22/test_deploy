import { useEffect } from "react";
import { fetchWorkouts } from "../http";
import useAuthContext from "../hooks/useAuthContext.js";

//pages & components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

//hooks and context
import useWorkoutContext from "../hooks/useWorkoutContext.js";

export default function Home() {
  const {workouts,dispatch}=useWorkoutContext();
  const {user}= useAuthContext();
  useEffect(()=>{
    async function fetchPlaces() {
      try {
        const resData= await fetchWorkouts(user);
        
        if(resData){
            dispatch({type:"SET_WORKOUTS", payload:resData});
        }
        
      } catch (error) {
        //..
        console.log(error);
      } 
    }
    if(user){
      fetchPlaces();
    }
  },[dispatch,user]);

  
  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm/>
    </div>
  );
}
