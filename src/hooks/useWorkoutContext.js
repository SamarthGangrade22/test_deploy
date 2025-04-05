import { WorkoutContext} from "../store/workout-context.jsx";
import { useContext } from "react";

export default function useWorkoutContext(){
    const context = useContext(WorkoutContext);

    if(!context){
        throw Error("useWorkoutContext must be used inside a WorkoutContextProvider");
    }

    return context
}