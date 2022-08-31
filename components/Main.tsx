import React from 'react';
import Link from 'next/link';
import { Avatar, Grid, Link as MUILink, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0';

const Header: React.FC = () => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  let main = <div/>

  if (!user) {
    main =  (
      <div>
        Please login
      </div>
    );
  }

  if (user) {
    main =  (
      <div>
        Welcome
      </div>
    );
  }

  return (
    <nav>
    <Box display="flex" p={2} >
      {main}
    </Box>
    </nav>

  );
};

export default Header;