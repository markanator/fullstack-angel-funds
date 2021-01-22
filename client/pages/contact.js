import React from 'react'
import Layout from '../components/Layout';
import auth0 from './api/utils/auth0';

export default function contact({user}) {
  return (
    <Layout user={user} SEO={{title: "Contact Us - VR Funds"}}>
      Contact
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