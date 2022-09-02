import { useUser } from '@auth0/nextjs-auth0'
import DoneIcon from '@mui/icons-material/Done'
import { Box, IconButton, Paper, Stack, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import router from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import User, { UserProps } from '../components/User'
import prisma from '../lib/prisma'


export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      employeeToUser : {}
    },
  }); 
  return { props: { users: users } };
}

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
  
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();      
    try {
      const body = { newName, newEmail, value};
      const resp : string = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), 
      }).then(function(response) {
        return response.json();});
      router.reload();
    } catch (error) {
      console.error(error);
    }
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
          <Box mt={1}><TextField  value={newName} onChange={handleChangeNewName} id="outlined-basic" label="Nom" variant="outlined" /></Box>
          <Box mt={1}><TextField  value={newEmail} onChange={handleChangeNewEmail} id="outlined-basic" label="E-mail" variant="outlined" /></Box>
          <Box mt={1}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
          label="Date d'arrivée"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params : any) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </Box>
          <IconButton aria-label="add new post" onClick={submitData}>
                  <DoneIcon/>
          </IconButton>

          </Stack>
          </Box>

          
                
    </Layout>
  )
}

export default Users
