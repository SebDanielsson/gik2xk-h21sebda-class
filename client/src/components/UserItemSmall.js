import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

function UserItemSmall(props) {
  const { user } = props;
  return user ? (
    <>
      <Link to={`/users/${user.id}/posts`}>
        <Box display="flex" alignItems="center" gap=".7rem" {...props}>
          <Avatar alt={`Bild på ${user.username}`} src={user.imageUrl}></Avatar>
          <Typography variant="h4">{user.username}</Typography>
        </Box>
      </Link>
    </>
  ) : (
    <Typography variant="h4">Användaruppgifter saknas</Typography>
  );
}

export default UserItemSmall;
