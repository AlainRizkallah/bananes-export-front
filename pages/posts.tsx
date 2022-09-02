import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Main from '../components/Main'
import prisma from '../lib/prisma'
import Post, { PostProps } from '../components/Post'
import { useUser } from '@auth0/nextjs-auth0';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react'
import React from 'react'
import NewPost from '../components/NewPost'
import { UserProps } from '../components/User'


export const getServerSideProps: GetServerSideProps = async () => {
  const posts = await prisma.post.findMany({
    include: {
      User_author: {
        select: { name: true, email: true, id: true },
      },
      User_employee: {
        select: { name: true, email: true, id: true },
      },
    },
  }); 
  console.log('posts', posts)
  const available_users = await prisma.user.findMany({
    include: {
      employeeToUser : {}
    },
    where: {
      employeeToUser: null
    }
  }); 
  console.log('available_users', available_users)
  return { props: { posts: posts, available_users: available_users } };
}

type Props = {
  available_users: UserProps[] | undefined
  posts: PostProps[]
}

const Posts: NextPage<Props> = (props) => {

  const [newPost, setNewPost] = React.useState(false);

  const { user, error, isLoading } = useUser();

  if(!user)
  return(
    <Layout>
            
            <Head>
              <title>Posts</title>
              <meta name="description" content="BananesExport web application" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            
           Please login
  
        </Layout>
  )

  return (  
      <Layout>
        
        <Head>
          <title>Posts</title>
          <meta name="description" content="BananesExport web application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box sx={{ flexGrow: 1 }} mx={2}>
        <Grid container spacing={2}>
        {props.posts.map((post) => (
              <Post post={post} user={user} available_users={props.available_users}/>
          ))}
          {newPost ?
          <NewPost user={user} />
          :
          <Grid item xs={12} md={6} lg={4}>
            <Box p={1} px={2} mt={1}  > 
              <Stack alignItems="center">
                <Box>Nouveau Poste</Box>
                <IconButton onClick={()=>{setNewPost(true)}} aria-label="add new post">
                  <AddIcon/>
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          }
        </Grid>
        </Box>
                
    </Layout>
  )
}

export default Posts
