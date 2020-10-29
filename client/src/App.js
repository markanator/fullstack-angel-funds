import React from 'react';
import { Route, Switch } from 'react-router-dom';
// locals
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPass from './pages/Auth/ForgotPass';
import Dashboard from './pages/Dashboard/Dashboard';
import Account from './pages/Dashboard/Account';
import CreateProject from './pages/Dashboard/CreateProject';
import ProjectDetails from './pages/Projects/ProjectDatails';
// context Provider
import UserProvider from './context/userContext';
// private route
import PrivateRoutes from './utils/PrivateRoutes';
import AuthProvider from './context/AuthContext';

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
          {/* PRIVATE ROUTES GO HERE */}
          <PrivateRoutes exact path="/dashboard">
            <Dashboard />
          </PrivateRoutes>
          <PrivateRoutes exact path="/dashboard/account">
            <Account />
          </PrivateRoutes>
          <PrivateRoutes exact path="/dashboard/create">
            <CreateProject />
          </PrivateRoutes>
          {/* catch all  */}
          <Route>
            <main className="container m-auto">
              <h1>ERROR</h1>
              <p>Page does not exist</p>
            </main>
          </Route>
        </Switch>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
