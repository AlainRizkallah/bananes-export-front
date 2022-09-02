import { UserProfile } from "@auth0/nextjs-auth0";
import { Button, Box, Grid, IconButton, Paper, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme, Select, Checkbox, InputLabel, FormControl, MenuItem, SelectChangeEvent, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DoneIcon from '@mui/icons-material/Done';
import React, { useEffect, useState } from "react";
import router from "next/router";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ComputerIcon from '@mui/icons-material/Computer';
import CallIcon from '@mui/icons-material/Call';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

export type PostProps = {
    id: string;
    postType: string;
    User_author: {name : string, email : string, id : string}
    User_employee:  {name : string, email : string, id : string}
    pcType : string;
    screen : number;
    Phone : string;
    Headset: Boolean;
  };

var postTypes : any = {
    DEV: 'Dévelopeur',
    COM: 'Commercial',
    TRADE: 'Trader'
  };
 

  const Post: React.FC<{ post: PostProps, user:UserProfile | undefined, available_users: UserProfile[] | undefined }> = ({ post, user, available_users }) => {
    
    const [editPost, setEditPost] = React.useState(false);
    const [nbScreen, setNbScreen] = React.useState(post.screen ? post.screen : 0);

    const handlePlus = () => {
      if((nbScreen >= 0) && (nbScreen < 3)){
        if((post.postType === 'DEV') || (post.postType === 'COM')){
          var budgetVar_tmp =  0 
          + (equip.pc[pcType]? equip.pc[pcType]: 0) 
          + (equip.ecran * (nbScreen+1))
          + (equip.tel[phone]? equip.tel[phone] : 0)
          + (checked? equip.casque : 0)
          if(budgetVar_tmp<3000) 
          setNbScreen(nbScreen+1);
        } else {
          setNbScreen(nbScreen+1);
        }

      }
      
    };
    const handleMinus = () => {
      if((nbScreen > 0) && (nbScreen <= 3))
      setNbScreen(nbScreen-1);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    // const [mark, setMark] = React.useState(false);

    const handleModifier = () => {
    // if(!mark){
    //   setMark(true)
    //   if(post.pcType === 'portable') 
    //   setBudget(budget - equip.pc.portable)
    //   if(post.pcType === 'fixe') 
    //   setBudget(budget - equip.pc.fixe)
    // }
    setEditPost(!editPost);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const handleDeleteClose = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      deletePost(e);
      handleClose();
    };

    const deletePost = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const body = { post };
        await fetch('/api/post', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        router.reload();
      } catch (error) {
        console.error(error);
      }
    };

    const [submitted, setSubmitted] = useState(false);
    const submitData = async (e: React.SyntheticEvent) => {
      e.preventDefault();      
      setSubmitted(true)
      try {
        const body = { post, personId, pcType, nbScreen, phone, checked  };
        const resp : string = await fetch('/api/post', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body), 
        }).then(function(response) {
          return response.json();});
        router.reload();
        console.log('resp',resp)
      } catch (error) {
        console.error(error);
      }
    };

    const [checked, setChecked] = React.useState<Boolean>(post.Headset ? post.Headset : false);

    const handleCasqueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if((post.postType === 'DEV') || (post.postType === 'COM')){
        var budgetVar_tmp =  0 
        + (equip.pc[pcType]? equip.pc[pcType]: 0) 
        + (equip.ecran * nbScreen)
        + (equip.tel[phone]? equip.tel[phone] : 0)
        + (event.target.checked? equip.casque : 0)
        if(budgetVar_tmp<3000) 
        setChecked(event.target.checked);
      } else {
        setChecked(event.target.checked);
      }
    };

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



    const [pcType, setPcType] = React.useState(post.pcType);
    const handlePcTypeChange = (event: SelectChangeEvent) => {
      if((post.postType === 'DEV') || (post.postType === 'COM')){
        var budgetVar_tmp =  0 
        + (equip.pc[event.target.value]? equip.pc[event.target.value]: 0) 
        + (equip.ecran * nbScreen)
        + (equip.tel[phone]? equip.tel[phone] : 0)
        + (checked? equip.casque : 0)
        if(budgetVar_tmp<3000) 
        setPcType(event.target.value);
      } else {
        setPcType(event.target.value);
      }
    };
    const [phone, setPhone] = React.useState(post.Phone);
    const handlePhoneChange = (event: SelectChangeEvent) => {
      if((post.postType === 'DEV') || (post.postType === 'COM')){
        var budgetVar_tmp =  0 
        + (equip.pc[pcType]? equip.pc[pcType]: 0) 
        + (equip.ecran * nbScreen)
        + (equip.tel[event.target.value]? equip.tel[event.target.value] : 0)
        + (checked? equip.casque : 0)
        if(budgetVar_tmp<3000) 
        setPhone(event.target.value);
      } else {
        setPhone(event.target.value);
      }
    };

    const [personId, setPersonId] = React.useState(post.User_employee?.id);
    const [personName, setPersonName] = React.useState(post.User_employee?.name);
    const handlePersonIdChange = (event: SelectChangeEvent) => {
      console.log(event.target.value)
      setPersonId(event.target.value);
    };    

    var equip : any = {
      pc:{
        portable: 1800,
      fixe: 2200,
      },
      ecran: 250,
      tel:{
        fixe: 100,
        smartphone: 600,
      },
      casque: 250
    };

    var budgetVar =  0 
    + (equip.pc[pcType]? equip.pc[pcType]: 0) 
    + (equip.ecran * nbScreen)
    + (equip.tel[phone]? equip.tel[phone] : 0)
    + (checked? equip.casque : 0)

    

    
    return(
        <Grid item xs={12} md={6} lg={4}>
        <Box p={1} px={2} mt={1} component={Paper}> 
        <Stack alignItems="center">
        <Box><Typography variant="h5" sx={{fontWeight : 600}}>{postTypes[post.postType]}</Typography></Box>

        {editPost ? 
        <div> 
        
        
          <Typography variant="h6"> {budgetVar} € </Typography>
          

        <Box mt={1}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Employé(e)</InputLabel>
        <Select label="Employé(e)" 
          onChange={handlePersonIdChange}
          value={personId}>

        {post.User_employee !==undefined ? 
        <MenuItem value={post.User_employee?.id}>{post.User_employee?.name}</MenuItem> : ""}

        {available_users?.map((user) => {
          if(user.id)
          return (
            <MenuItem value={user.id}>{user.name}</MenuItem>
          );
        })} 

            
        </Select>
        </FormControl>
        </Box>
        
        <Box>
        {post.postType === 'DEV' ? 
        <FormControl fullWidth>
        <InputLabel> Type de PC </InputLabel>
        <Select label="Type de PC" value={pcType}
          onChange={handlePcTypeChange}>
          <MenuItem value={"fixe"}>fixe</MenuItem>
          <MenuItem value={"portable"}>portable</MenuItem>
        </Select>
        </FormControl>
        : post.postType === 'COM' ? "PC portable": post.postType === 'TRADE' ? 'PC fixe': ""}
        </Box>
        
        {post.postType !== 'TRADE' ? 
        <div>
          {"Nombre d'écran(s) : "}
        <IconButton size="small" onClick={handleMinus} aria-label="delete" color='secondary' >
          <RemoveIcon />
        </IconButton>
          {nbScreen}
        <IconButton size="small" onClick={handlePlus} aria-label="delete" color='secondary' >
          <AddIcon />
        </IconButton>
        </div>
         :
         <Box>{post.screen ? "Nombre d'écran(s) : "+post.screen : "Pas d'écran(s)"}</Box> }

        <Box>
        {post.postType === "COM" ? <Box>{post.Phone ? "Téléphone : "+post.Phone : "Pas de téléphone"}</Box> :
          
          <FormControl fullWidth>
          <InputLabel>Type de téléphone</InputLabel>
          <Select label="Type de téléphone" value={phone}
          onChange={handlePhoneChange}>
          <MenuItem value={"fixe"}>fixe</MenuItem>
          <MenuItem value={"smartphone"}>smartphone</MenuItem>
          </Select>
          
          </FormControl>
          
        }
        </Box>
        <Box>
          Casque sans fil
        <Checkbox
          // @ts-ignore 
          checked={checked}
          onChange={handleCasqueChange}
          inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>

        
        <IconButton size="small" aria-label="validate" color='secondary' onClick={submitData}>
          <DoneIcon />
        </IconButton>

        </div>
        :
        <div>
        <Box mb={1}><Typography variant="h6">{post.User_employee ? post.User_employee.name : "Non assigné"}</Typography></Box>
        <Box display='flex' alignItems={'center'}><MailOutlineIcon/>{'. '}{post.User_employee ? post.User_employee.email : "Non assigné"}</Box>
        <Box display='flex' alignItems={'center'}><ComputerIcon/>{'. '}{!post.pcType ? "Pas de PC" : post.pcType==="portable" ? "PC portable"  : post.pcType==="fixe" ? "PC fixe" : ""}</Box>
        <Box>{post.screen ? "Nombre d'écran(s) : "+post.screen : "Pas d'écran(s)"}</Box>
        <Box display='flex' alignItems={'center'}><CallIcon/>{'. '}{post.Phone ? "Téléphone : "+post.Phone : "Pas de téléphone"}</Box>
        <Box display='flex' alignItems={'center'}><HeadsetMicIcon/>{'. '}Casque sans fil : {post.Headset ? "Oui": "Non" }</Box>
        </div>
        }
        
        {(post.User_author?.email === user?.email) || (post.User_employee?.email === user?.email) ?
        <div>
        <Button size="small" onClick={handleModifier} variant={editPost? "contained" : "outlined"} startIcon={<EditIcon />}>
          modifier
        </Button>

        <IconButton size="small" onClick={handleClickOpen} aria-label="delete" color='secondary' >
          <DeleteIcon />
        </IconButton>
        </div>
        : <Box>Auteur du poste : {post.User_author.name}</Box>}
        <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Post"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleDeleteClose} autoFocus>
            Yes
          </Button>
          <Button color="secondary" autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </Stack>
        </Box>
        </Grid>
    );
};

export default Post;