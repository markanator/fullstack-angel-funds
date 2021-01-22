import React from 'react'
import AuthBanner from '../../components/authShared/AuthBanner';
import Layout from '../../components/Layout';
import auth0 from '../api/utils/auth0';

export default function AddProjectPage({user}) {
  console.log("add project props",user);
  return (
    <Layout user={user} SEO={{title: "Add a Project - VR Funds"}}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='Add a Project'
      />
      ADDING PROJECT FORM
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
