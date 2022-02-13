import { Button, Chip, Divider, Grid, Paper, Typography } from '@mui/material';
import { grey, teal } from '@mui/material/colors';
import { truncate, toDateTimeString } from '../helpers/formatting';
import { PlaceHolderImage } from './PlaceHolders';
import React from 'react';
import { Link } from 'react-router-dom';
import UserItemSmall from './UserItemSmall';
import { Box } from '@mui/system';
import Tag from './Tag';

export default function PostItemSmall({ post }) {
  return (
    <>
      <Paper
        elevation={1}
        sx={{
          marginBottom: 4,
          marginTop: 4,
          backgroundColor: grey[50]
        }}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: 2
          }}>
          <Grid item xs={12}>
            <UserItemSmall user={post.author} />
            <Divider />
          </Grid>
          <Grid item xs={3}>
            {<PlaceHolderImage source={post} />}
          </Grid>
          <Grid item xs={9}>
            <Link to={`/posts/${post.id}`}>
              <Grid container rowSpacing={1}>
                <Grid item>
                  <Typography
                    variant='h5'
                    component='p'
                    sx={{
                      textTransform: 'uppercase',
                      color: teal[900]
                    }}>
                    {truncate(post.title, 30)}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {post.tags &&
                    post.tags.map((tag) => {
                      return <Tag tag={tag} />;
                    })}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' component='p'>
                    Skrivet: {toDateTimeString(post.createdAt)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='body2'>
                    {truncate(post.body, 200)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      sx={{ marginTop: 1 }}
                      size='small'
                      variant='contained'
                      color='secondary'>
                      Läs mer...
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
