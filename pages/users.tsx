import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Main from '../components/Main'
import { useUser } from '@auth0/nextjs-auth0';
import prisma from '../lib/prisma'
import User, { UserProps } from '../components/User'
import { Box, IconButton, Paper, Stack, TextField } from '@mui/material'
import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      employeeToUser : {}
    },
  }); 
  console.log('log_1', users)
  return { props: { users: users } };
}

// TODO -> any to userprops
type Props = {
  users: UserProps[] 
}
 
const Users: NextPage<Props> = (props) => {
  
  const { user, error, isLoading } = useUser();

  const [newName, setNewName] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');

  const handleChangeNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };
  const handleChangeNewEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  if(!user)
  return(
    <Layout>
            
            <Head>
              <title>Users</title>
              <meta name="description" content="BananesExport web application" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            
           Please login
  
        </Layout>
  )


 return (  
      <Layout>
        
        <Head>
          <title>Users</title>
          <meta name="description" content="BananesExport web application" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        {props.users.map((user) => (
            <div key={user.id} className="users">
              <User user={user} />
            </div>  
          ))}
          
          <Box p={1} px={2} mt={1} component={Paper}> 
          <Stack alignItems="center">
          <Box>Nouvel Utilisateur</Box>
          <TextField  value={newName} onChange={handleChangeNewName} id="outlined-basic" label="Nom" variant="outlined" />
          <TextField  value={newEmail} onChange={handleChangeNewEmail} id="outlined-basic" label="E-mail" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
          label="Date d'arrivée"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params : any) => <TextField {...params} />}
        />
        </LocalizationProvider>
          <IconButton aria-label="add new post">
                  <DoneIcon/>
          </IconButton>

          </Stack>
          </Box>

          
                
    </Layout>
  )
}

export default Users
