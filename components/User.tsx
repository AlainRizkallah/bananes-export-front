import { Box, Paper, Stack } from "@mui/material";

export type UserProps = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    employeeToUser: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      postType: string;
      author: string;
      employee: string;
    }
  };

  var postTypes : any = {
    DEV: 'Dévelopeur',
    COM: 'Commercial',
    TRADE: 'Trader'
  };
  
  const User: React.FC<{ user: UserProps }> = ({ user }) => {
    return(

        <Box p={1} px={2} mt={1} component={Paper}> 
        <Stack alignItems="center">
        <Box>{user.name ? user.name : "no name"}</Box>
        <Box>{user.email ? user.email : "no email"}</Box>
        <Box>{user.employeeToUser ? postTypes[user.employeeToUser.postType] : "Non assigné"}</Box>
        </Stack>
        </Box>
    );
};

export default User;