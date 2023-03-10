import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

function Comment({ comment }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          alt={`Bild på ${comment.author}`}
          src={comment.authorImage}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment.title}
        secondary={
          <Typography variant="body2">{`${comment.author} säger: ${comment.body}`}</Typography>
        }
      />
    </ListItem>
  );
}

export default Comment;
