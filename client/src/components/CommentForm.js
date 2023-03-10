import { Button, TextField } from '@mui/material';
import { useState } from 'react';

function CommentForm({ onSave }) {
  const [comment, setComment] = useState({ title: '', body: '' });

  return (
    <form style={{ width: '100%' }}>
      <TextField
        fullWidth
        margin="normal"
        label="Rubrik"
        name="title"
        value={comment.title}
        onChange={(e) => setComment({ ...comment, title: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Kommentar"
        name="body"
        multiline
        minRows="4"
        value={comment.body}
        onChange={(e) => setComment({ ...comment, body: e.target.value })}
      />
      <Button onClick={() => onSave({ ...comment, userId: 1 })}>
        Lägg till kommentar
      </Button>
    </form>
  );
}

export default CommentForm;
