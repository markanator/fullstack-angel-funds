import { Container } from '@chakra-ui/react';
import React from 'react'
import AuthBanner from '../../components/authShared/AuthBanner';
import Layout from '../../components/Layout';
import AccountNavbar from '../../components/myAccountShared/AccountNavbar';
import auth0 from '../api/utils/auth0';

export default function settings({user}) {
  return (
    <Layout user={user} SEO={{title: "My Settings - VR Funds"}}>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='My Settings'
      />
      <Container maxW='7xl' bgColor='gray.200' py='2rem'>
        <AccountNavbar />
      </Container>
      SETTINGS
    </Layout>
  )
}

// make sure user is logged in
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
