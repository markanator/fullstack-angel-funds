import React from 'react'
import Layout from '../components/Layout';
import auth0 from './api/utils/auth0';

export default function explore({user}) {
  return (
    <Layout user={user} SEO={{title: "Explore Projects - VR Funds"}}>
      EXPLORE
    </Layout>
  )
}

export async function getServerSideProps({req,res}) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    return {props: {}};
  }

  return {
    props: {
      user: session.user || null
    }
  }
}