import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Main from '../components/Main'

const Users: NextPage = () => {
  
  return (
      <Layout>
        
        <Head>
          <title>Users</title>
          <meta name="description" content="BananesExport web application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
    </Layout>
  )
}

export default Users
