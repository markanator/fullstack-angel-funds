import React from 'react';
import About from '../components/homePageFeatures/About';
// locals
import CTA from '../components/homePageFeatures/CTA';
import FeaturedProjects from '../components/homePageFeatures/FeaturedProjects';
import Hero from '../components/homePageFeatures/Hero';
import TopCategories from '../components/homePageFeatures/TopCategories';
import Layout from '../components/Layout';


const Index = () => (
  <Layout >
    <Hero />
    <TopCategories />
    <CTA />
    <FeaturedProjects />
    <About />
    <p>Main Body</p>
  </Layout>
)

export default Index
