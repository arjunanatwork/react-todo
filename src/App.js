import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import SignIn from "./components/signin/signin.component";
import SignUp from "./components/signup/signup.component";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signup" component={SignUp}/>
      </Switch>
    </div>
  );
}

export default App;
