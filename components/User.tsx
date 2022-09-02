import { Box, Paper, Stack } from "@mui/material";

export type UserProps = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    ArrivalAt: Date;
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
    const today = new Date();
    today.setHours(23, 59, 59, 998);
    var options = { year: "numeric", month: 'long', day: 'numeric'} as const;
    // const time_start = new Date(user.ArrivalAt).toLocaleString('fr-FR', options);
    return(

        <Box p={1} px={2} mt={1} component={Paper}> 
        <Stack alignItems="center">
        <Box>{user.name ? user.name : "no name"}</Box>
        <Box>{user.email ? user.email : "no email"}</Box>
        <Box>{user.employeeToUser ? postTypes[user.employeeToUser.postType] : "Non assigné"}</Box>
        {user.ArrivalAt > today ? "Arrive le "+user.ArrivalAt.toLocaleString('fr-FR', options) : ""}
        </Stack>
        </Box>
    );
};

export default User;