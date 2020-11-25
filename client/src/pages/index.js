import { Code, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import {Hero} from '../components/Hero'


const Index = () => (
  <Layout >
    <Hero />
      <Text>
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.
      </Text>
  </Layout>
)

export default Index
