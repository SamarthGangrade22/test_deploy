import { authContext } from "../store/authContext";
import { useContext } from "react";

export default function useAuthContext(){
    const context = useContext(authContext);

    if(!context){
        throw Error("useAuthContext must be used inside a AuthContextProvider");
    }

    return context
}