import React from 'react'
import Layout from '../../components/Layout';

export default function projectDetails({user}) {
  return (
    <Layout user={user} SEO={{title: "Project - VR Funds"}}>
      Project Details
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