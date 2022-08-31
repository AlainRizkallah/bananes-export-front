import React from 'react';
import Link from 'next/link';
import { Avatar, Grid, IconButton, Link as MUILink, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';

import { useTheme } from "next-themes";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

    const { user, error, isLoading } = useUser();
    // if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    const { theme, resolvedTheme, setTheme } = useTheme();

  let left = (
        <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
        <Link href="/" passHref>
         <MUILink variant="body2" style={{ textDecoration: 'none' }}>
            <Button variant={isActive("/")? "contained" : "outlined"}>
              Home
            </Button>
          </MUILink>
        </Link>
        </Grid>
        </Grid>
  );

  let right = null;

  if (isLoading){
    right = (
      <div className="right">
        Loading...
      </div>
    );
  }

  if (!user) {
    right = (
      <div className="right">
        <IconButton sx={{ ml: 1 }} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} color="inherit">
        {resolvedTheme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
        <a href="/api/auth/login"><Button variant='outlined'>Login</Button></a>
      </div>
    );
  }

  if (user) {
    left = (
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
        <Link href="/" passHref>
         <MUILink variant="body2" style={{ textDecoration: 'none' }}>
            <Button variant={isActive("/")? "contained" : "outlined"}>
              Home
            </Button>
          </MUILink>
        </Link>
        </Grid>
        <Grid item>
        <Link href="/posts" passHref>
         <MUILink variant="body2" style={{ textDecoration: 'none' }}>
            <Button variant={isActive("/posts")? "contained" : "outlined"}>
              Posts
            </Button>
          </MUILink>
        </Link>
        </Grid>
        <Grid item>
        <Link href="/users" passHref>
         <MUILink variant="body2" style={{ textDecoration: 'none' }}>
            <Button variant={isActive("/users")? "contained" : "outlined"}>
              Users
            </Button>
          </MUILink>
        </Link>
        </Grid>
        </Grid>
    );
    right = (
      <div className="right">
        <IconButton sx={{ ml: 1 }} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} color="inherit">
        {resolvedTheme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
        <Box display='flex'>
            {user.picture ? <Avatar src={user.picture} /> : <Avatar />}

              <Box mx={2}>
            <Typography>
              {user.name} ({user.email})
            </Typography>
              </Box>

              <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item>


                  <Box display='inline-block' alignItems='center'>
            <a href="/api/auth/logout"><Button variant='outlined'>Logout</Button></a>
              </Box>

              </Grid>
              </Grid>

        </Box>

      </div>
    );
  }

  return (
    <nav>
    <Box display="flex" p={2} >
      {left}
      {right}
    </Box>
    </nav>

  );
};

export default Header;