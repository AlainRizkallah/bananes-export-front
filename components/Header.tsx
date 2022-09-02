import { useUser } from '@auth0/nextjs-auth0';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, Link as MUILink, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from "next-themes";
import Link from 'next/link';
import * as React from 'react';

const pages = ['posts', 'users'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const { theme, resolvedTheme, setTheme } = useTheme();


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Box mr={1}><Image src="/cat.svg" height={30} width={30} /></Box> */}
        
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Home
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Home
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={"/"+page} passHref>
              <MUILink variant="body2" style={{ textDecoration: 'none' }}>
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
               </MUILink>
             </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
         
        { !user &&
      <IconButton sx={{ ml: 1 }} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} color="inherit">
        {resolvedTheme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>}

            {user ? <div>
              <IconButton sx={{ ml: 1 }} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} color="inherit">
        {resolvedTheme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton> 

              <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user.picture ? <Avatar src={user.picture} /> : <Avatar />}
              </IconButton>
            </Tooltip>
          
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser} 
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            > 
            <Box p={1}>
            <Typography>
              {user.name} 
            </Typography>
            <small>
            ({user.email}) 
            </small>
            </Box>
              
                <MenuItem key={'setting'} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><a href="/api/auth/logout"><Button variant='outlined' color='secondary'>Logout</Button></a>  </Typography>
                </MenuItem>
              
            </Menu>

            </div>
            
            : <a href="/api/auth/login"><Button variant='outlined' color='secondary' >Login</Button></a>}
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
