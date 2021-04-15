import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthCheck from "./components/AuthCheck";
import Layout from "./Layout";
import UserProvider from "./store/userStore";
import Login from "./views/Login";

function App() {

  return (
    <Router>
        <Switch>
          <UserProvider>
            <Route path="/login" name="ログイン" exact component={Login} />
            <AuthCheck>
              <Route path="/" render={(props) => <Layout {...props} />} />
            </AuthCheck>
          </UserProvider>
        </Switch>
    </Router>
  );
}

export default App;
