import { Code, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import {Hero} from '../components/homePageFeatures/Hero'
import FlowShowcase from '../components/homePageFeatures/FlowShowcase'
import JoinCommunity from '../components/homePageFeatures/JoinCommunity'
import JoinSite from '../components/homePageFeatures/JoinSite'


const Index = () => (
  <Layout >
    <Hero />
    {/* FEATURED */}
    {/* FLOW SHOWCASE */}
    <FlowShowcase />
    {/* JOIN OR COMMUNITY */}
    <JoinCommunity />
    {/* GET STARTED */}
    <JoinSite />
  </Layout>
)

export default Index
