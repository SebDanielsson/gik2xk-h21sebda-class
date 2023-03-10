import { List } from '@mui/material';
import Comment from './Comment';

function CommentList({ comments }) {
  return (
    <List>
      {comments &&
        comments.map((comment, i) => (
          <Comment key={`comment_${i}`} comment={comment} />
        ))}
    </List>
  );
}

export default CommentList;
