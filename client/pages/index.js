import { Flex } from '@chakra-ui/react';
import React from 'react';
import About from '../components/homePageFeatures/About';
// locals
import CTA from '../components/homePageFeatures/CTA';
import Explore from '../components/homePageFeatures/Explore';
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
    <Flex as='section' w='full' mt='-312px' bgColor='color_primary' padding='432px 0 0'></Flex>
    <Explore />
    <p>Main Body</p>
  </Layout>
)

export default Index
