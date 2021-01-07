import React from 'react'
import { Hero } from '../components/homePageFeatures/Hero';
import TopCategories from '../components/homePageFeatures/TopCategories';
import Layout from '../components/Layout';


const Index = () => (
  <Layout >
    <Hero />
    <TopCategories />
    <p>Main Body</p>
  </Layout>
)

export default Index
