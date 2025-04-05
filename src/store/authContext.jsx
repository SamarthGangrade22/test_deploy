import { createContext, useReducer,useEffect } from "react";

export const authContext = createContext();

function authReducer(state, action) {
  if (action.type === "LOGIN") {
    return {
      user: action.payload,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      user: null,
    };
  }
  return state;
}
export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"));
    if(user){
        dispatch({type: "LOGIN", payload: user})
    }
  },[])
  console.log("AuthContext state:", state);
  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}
