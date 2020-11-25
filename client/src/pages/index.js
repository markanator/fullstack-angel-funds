import { Code, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import {Hero} from '../components/homePageFeatures/Hero'
import FlowShowcase from '../components/homePageFeatures/FlowShowcase'


const Index = () => (
  <Layout >
    <Hero />
    {/* FEATURED */}
    {/* FLOW SHOWCASE */}
    <FlowShowcase />
  </Layout>
)

export default Index
