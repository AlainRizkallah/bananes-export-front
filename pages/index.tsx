import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import Main from '../components/Main'

const Home: NextPage = () => {
  
  return (
      <Layout>
        
        <Head>
          <title>Bananes Export</title>
          <meta name="description" content="BananesExport web application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <Main/>
        
    </Layout>
  )
}

export default Home
