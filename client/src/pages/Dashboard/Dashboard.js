import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
// locals
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { useNotify } from '../../context/Notifications/NotifcationProvider';

export default function Dashboard() {
  const { path } = useRouteMatch();

  const notify = useNotify();
  const { currentUser, signout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await signout();
      history.push('/login');
    } catch {
      notify({ type: 'danger', text: 'Failed to logout. Try again later.' });
    }
  }

  console.log(currentUser);
  return (
    <Layout>
      <main className="container m-auto">
        <div className="flex flex-col items-center">
          <span>
            <h1>Profile:</h1>
            <p>{currentUser && currentUser.email}</p>

            <Link to={`${path}/account`} className="hover:underline">
              Update Profile
            </Link>
          </span>
          <br />
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </main>
    </Layout>
  );
}
