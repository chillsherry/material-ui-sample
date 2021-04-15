import { useEffect, useContext } from "react";
import { firebase } from "../config/firebase";
import {UserContext} from "../store/userStore";

const Logout = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const logout = async () => {
      await firebase.auth().signOut();
      dispatch({
        type: "logout"
      });
    }
    logout();
  }) 
  
  return null;
}

export default Logout;