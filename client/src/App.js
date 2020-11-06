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
// private route
import PrivateRoutes from './utils/PrivateRoutes';
// context Provider
import AuthProvider from './context/AuthContext';
import NewProjectProvider from './context/CreateProject/NewProjectContext';

function App() {
  return (
    <AuthProvider>
      <NewProjectProvider>
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

          {/* ROUTES TO MAKE PROJECT */}
          <PrivateRoutes path="/dashboard/create/:pageID">
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
      </NewProjectProvider>
    </AuthProvider>
  );
}

export default App;
