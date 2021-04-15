import React, { useReducer } from "react";
// import firebase from "firebase";
// import { Role } from "../constants/roles";

const initialUserState = {
  uid: "",
  role: "",
  email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      console.log("login!");
      return {
        uid: action.payload.uid,
        role: action.payload.role,
        email: action.payload.email
      }
    case "logout":
      console.log("logout!");
      return initialUserState;
    default:
      return initialUserState;
  }
}

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;



