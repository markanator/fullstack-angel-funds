import React from 'react';
import { Route, Switch } from 'react-router-dom';
// locals
import Home from './pages/Home';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDatails';
import Signup from './pages/Signup';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/project/:slug">
          <ProjectDetails />
        </Route>
        <Route>
          <p>Oops</p>
        </Route>
      </Switch>
    </>
  );
}

export default App;
