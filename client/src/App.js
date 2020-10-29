import React from 'react';
import { Route, Switch } from 'react-router-dom';
// locals
import Home from './pages/Home';
import Login from './pages/Login';
import ProjectDetails from './pages/ProjectDatails';
import Signup from './pages/Signup';
// context Provider
import UserProvider from './context/userContext';
// private route
import PrivateRoutes from './utils/PrivateRoutes';
import AuthProvider from './context/AuthContext';
import Dashbaord from './pages/Dashbaord';
import ForgotPass from './pages/ForgotPass';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
          <Route path="/forgot-password">
            <ForgotPass />
          </Route>
          <Route path="/project/:slug">
            <ProjectDetails />
          </Route>
          <PrivateRoutes path="/dashboard">
            <Dashbaord />
          </PrivateRoutes>
          <Route>
            <p>Oops</p>
          </Route>
        </Switch>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
