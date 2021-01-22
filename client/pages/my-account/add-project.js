import React from 'react'
import AuthBanner from '../../components/authShared/AuthBanner';
import Layout from '../../components/Layout';

export default function AddProjectPage() {
  return (
    <Layout>
      <AuthBanner
        bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
        title='Add a Project'
      />
      ADDING PROJECT FORM
    </Layout>
  )
}
