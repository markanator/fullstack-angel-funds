import React from 'react';
import { Route, Switch } from 'react-router-dom';
// locals
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDatails';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/project/:slug">
          <ProjectDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
