import useAuthContext from "./useAuthContext";
export default function useLogout() {
  const { dispatch } = useAuthContext();
  function logout() {
    //remove user from storage// remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  }
  return { logout };
}
