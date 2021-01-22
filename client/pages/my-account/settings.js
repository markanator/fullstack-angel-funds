import React from 'react'
import AuthBanner from '../../components/authShared/AuthBanner';
import Layout from '../../components/Layout';

export default function settings({user}) {
  return (
    <Layout user={user}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='My Settings'
      />
      SETTINGS
    </Layout>
  )
}

export async function getServerSideProps({req,res}) {
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/auth/login'
    });
    res.end();
    return;
  }


  return {
    props: {
      user: session.user
    }
  }
}
