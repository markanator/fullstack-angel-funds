import React from 'react'
import Layout from '../components/Layout';
import auth0 from './api/utils/auth0';

export default function contact({user}) {
  return (
    <Layout user={user}>
      Contact
    </Layout>
  )
}

export async function getServerSideProps({req,res}) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.end();
    return {props: {}};
  }

  return {
    props: {
      user: session.user || null
    }
  }
}