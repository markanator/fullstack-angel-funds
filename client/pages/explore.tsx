import { gql } from '@apollo/client';
import React from 'react';
import Layout from '../components/Layout';
import { client } from '../utils/apolloClient';
import auth0 from './api/utils/auth0';


export default function explore({user,projects}) {
  console.log("data",projects);
  return (
    <Layout user={user} SEO={{title: "Explore Projects - VR Funds"}}>
      EXPLORE
    </Layout>
  )
}

export async function getServerSideProps({req,res}) {
  const session = await auth0.getSession(req);

  const {data} = await client.query({
    query: gql`
    query GetProjects{
      projects{
        id
        title
        description
      }
    }
    `,
  });


  return {
    props: {
      projects: data.projects || null,
      user: session?.user || null
    }
  }
}