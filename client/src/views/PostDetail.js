import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

import PostItemLarge from '../components/PostItemLarge';
import { addComment, getOne } from '../models/PostModel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import EditIcon from '@mui/icons-material/Edit';

function PostDetail() {
  const params = useParams();
  const postId = params.id;

  const navigate = useNavigate();

  const [post, setPost] = useState({});

  useEffect(() => {
    getOne(postId).then((post) => setPost(post));
  }, [postId]);

  function onCommentAdd(comment) {
    addComment(postId, comment).then((post) => setPost(post));
  }

  return (
    <>
      <Container maxWidth="md">
        <PostItemLarge post={post} />
        <Box
          marginBottom="1rem"
          display="flex"
          justifyContent="space-between"
          gap=".3rem">
          <Button
            startIcon={<ChevronLeftIcon />}
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
            variant="contained">
            Tillbaka
          </Button>

          <Link to={`/posts/${postId}/edit`}>
            <Button
              color="secondary"
              startIcon={<EditIcon />}
              variant="contained">
              Ändra
            </Button>
          </Link>
        </Box>
        <Typography variant="h6" component="h4">
          Kommentarer
        </Typography>
        <CommentForm onSave={onCommentAdd}></CommentForm>

        {post.comments && <CommentList comments={post.comments}></CommentList>}
      </Container>
    </>
  );
}

export default PostDetail;
