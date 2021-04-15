import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../store/userStore";
import { Redirect } from "react-router-dom";
import { firebase } from "../config/firebase";

const AuthCheck = ({ children }) => {
  const { state, dispatch } = useContext(UserContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const check = async () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          dispatch({
            type: "login",
            payload: {
              uid: user.uid,
              role: "member",
              email: user.email,
            }
          });
        }
        setChecked(true);
      })
    }
    check();
  }, []);

  if (checked && state.uid) {
    return children;
  } else if (checked) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div style={{
        position: "absolute",
        left: 0, top: 0,
        width: "100%", height: "100%",
        background: "#ddd",
        zIndex: 2174483647,
        fontSize: "10pt",
        padding: 20,
      }} >
        Loading...
      </ div>
    )
  }

}

export default AuthCheck;