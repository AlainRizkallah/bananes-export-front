import { Box, Paper, Stack } from "@mui/material";

export type PostProps = {
    id: string;
    postType: string;
    User_author: {name : string, email : string}
    User_employee:  {name : string, email : string}
  };
  
  const Post: React.FC<{ post: PostProps }> = ({ post }) => {
    return(

        <Box p={1} px={2} mt={1} component={Paper}> 
        <Stack alignItems="center">
        <Box>{post.postType}</Box>
        <Box>{post.User_author.email}</Box>
        <Box>{post.User_employee.email}</Box>
        </Stack>
        </Box>
    );
};

export default Post;