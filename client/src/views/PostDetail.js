import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Paper,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import UserItemSmall from '../Components/UserItemSmall';
import { grey } from '@mui/material/colors';
import { toDateTimeString } from '../helpers/formatting';
import { pageSubtitle, pageTitle } from '../helpers/styles';

import { Box } from '@mui/system';
import Tag from '../Components/Tag';
import CommentList from '../Components/CommentList';
import CommentForm from '../Components/CommentForm';

export default function PostDetail(props) {
  const id = props.match.params.id;
  const isValidId = !isNaN(id);
  const postModel = new PostModel('posts');

  const [post, setPost] = useState({});

  console.log(post);
  useEffect(() => {
    if (isValidId) {
      postModel.getById(id).then((post) => {
        setPost(post);
      });
    }
  }, []);

  const addComment = (comment) => {
    postModel.addComment(post.id, comment).then((post) => {
      setPost({
        ...post,
        comments: [...post.comments, post.comments]
      });
    });
  };
  return (
    <>
      {post.author ? (
        <>
          <Card
            sx={{
              maxWidth: 800,
              margin: '0 auto',
              backgroundColor: grey[50]
            }}>
            <Box
              sx={{
                padding: '1rem'
              }}>
              <Typography
                sx={pageTitle.sx}
                variant={pageTitle.variant}
                component={pageTitle.component}>
                {post.title}
              </Typography>
              {post.tags &&
                post.tags.map((tag) => {
                  return <Tag tag={tag} key={tag} />;
                })}
            </Box>
            {post.imageUrl && (
              <CardMedia
                component='img'
                height='600'
                image={post.imageUrl}
                alt='green iguana'
              />
            )}
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                Skrivet: {toDateTimeString(post.createdAt)}
              </Typography>
              <UserItemSmall user={post.author} />

              <Typography variant='body2' color='text.secondary'>
                {post.body}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {props.location.from && (
                <Link to={props.location.from}>
                  <Button variant='contained' color='primary'>
                    Tillbaka
                  </Button>
                </Link>
              )}
              <Link
                to={{
                  pathname: `/posts/${post.id}/edit`,
                  from: props.location.pathname
                }}>
                <Button variant='contained'>Ändra</Button>
              </Link>
            </CardActions>
          </Card>
        </>
      ) : (
        <CircularProgress color='secondary' />
      )}
      <Paper
        sx={{
          maxWidth: '800px',
          margin: '2rem auto',
          padding: '1rem',
          boxSizing: 'border-box',
          backgroundColor: grey[50]
        }}>
        <Typography
          sx={pageSubtitle.sx}
          variant={pageSubtitle.variant}
          component={pageSubtitle.component}>
          Kommentarer
        </Typography>

        <CommentForm onSave={addComment} />

        {post.comments?.length > 0 && (
          <CommentList comments={(post.id, post.comments)} />
        )}
      </Paper>
    </>
  );
}
