import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Main from '../components/Main'
import prisma from '../lib/prisma'
import Post, { PostProps } from '../components/Post'


export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    include: {
      User_author: {
        select: { name: true, email: true },
      },
      User_employee: {
        select: { name: true, email: true },
      },
    },
  }); 
  console.log('feed', feed)
  return { props: { feed } };
}

type Props = {
  feed: PostProps[]
}

const Posts: NextPage<Props> = (props) => {
  
  return (  
      <Layout>
        
        <Head>
          <title>Posts</title>
          <meta name="description" content="BananesExport web application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>  
          ))}
                
    </Layout>
  )
}

export default Posts
