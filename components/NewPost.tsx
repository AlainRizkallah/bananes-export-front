import { UserProfile } from "@auth0/nextjs-auth0";
import { Button, Box, Grid, IconButton, Paper, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme, SelectChangeEvent, InputLabel, FormControl, Select, MenuItem, CircularProgress } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from "react";
import router from "next/router";

export type PostProps = {
    id: string;
    postType: string;
    User_author: {name : string, email : string}
    User_employee:  {name : string, email : string}
  };

var postTypes : any = {
    DEV: 'Dévelopeur',
    COM: 'Commercial',
    TRADE: 'Trader'
  };
 

  const NewPost: React.FC<{user:UserProfile | undefined }> = ({ user }) => {
    
    const [postType, setPostType] = React.useState('');
    
    const handleChangeSelectPostType = (event: SelectChangeEvent) => {
      setPostType(event.target.value as string);
    };
    const [submitted, setSubmitted] = useState(false);
    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();      
      setSubmitted(true)
      try {
        const body = { postType };
        const resp : string = await fetch('/api/post', {
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

    return(
      
      <Grid item xs={12} md={6} lg={4}>
      <Box p={1} px={2} mt={1} component={Paper}> 
      <Stack alignItems="center" >
      <form onSubmit={submitData}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type de poste</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={postType}
          label="Type de poste"
          onChange={handleChangeSelectPostType}
        >
          <MenuItem value={"DEV"}>Dévelopeur</MenuItem>
          <MenuItem value={'COM'}>Commercial</MenuItem>
          <MenuItem value={'TRADE'}>Trader</MenuItem>
        </Select>
      </FormControl>
  
      {submitted ? <CircularProgress color='secondary'/> :
              <IconButton type='submit' aria-label="add new post">
              <DoneIcon/>
              </IconButton>}
              </form>
      

      </Stack>
      </Box>
      </Grid>
      
    );
};

export default NewPost;