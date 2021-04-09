import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <React.Suspense>
        <Switch>
          <Route path="/" render={(props) => <Layout {...props} />} />
        </Switch>
      </React.Suspense>
    </Router>
  );
}

export default App;
