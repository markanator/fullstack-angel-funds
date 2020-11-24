import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
// locals
import Layout from '../../components/Layout';
import SEO from '../../components/SEO';
import { db } from '../../utils/Firebase';
import { useAuth } from '../../context/AuthContext';
import { useNotify } from '../../context/Notifications/NotifcationProvider';

export default function Dashboard() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const notify = useNotify();
  const { currentUser, signout } = useAuth();
  const [userProjects, setUserProjects] = useState(null);
  async function handleLogout() {
    try {
      await signout();
      history.push('/login');
    } catch {
      notify({ type: 'danger', text: 'Failed to logout. Try again later.' });
    }
  }
  const dbRef = db.collection('projects');

  useEffect(() => {
    dbRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setUserProjects(items);
    });
  }, []);

  console.log(userProjects[0]);

  // console.log(db.collection('projects'));
  return (
    <Layout>
      <SEO title="Dashboard" />
      <main className="container m-auto">
        <div className="flex flex-col items-center">
          <span>
            <h1>Profile:</h1>
            <h3>{currentUser.displayName || 'username not availavle'}</h3>
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
