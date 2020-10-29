import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// locals
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

export default function Dashbaord() {
  const { currentUser, signout } = useAuth();
  const [actionErr, setActionErr] = useState('');
  const history = useHistory();

  async function handleLogout() {
    setActionErr('');
    try {
      await signout();
      history.push('/login');
    } catch {
      setActionErr('Oops, an error occured');
    }
  }
  return (
    <Layout>
      <main className="container m-auto">
        <div className="flex flex-col items-center">
          <span>
            <h1>Profile:</h1>
            <p className="text-red-600">{actionErr}</p>
            <p>{currentUser && currentUser.email}</p>
            <Link to="/account" className="hover:underline">
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
