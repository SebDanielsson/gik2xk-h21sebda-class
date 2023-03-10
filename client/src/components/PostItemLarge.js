import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';

import { toDateTimeString } from '../formatHelper';
import { CustomPaper } from './SmallComponents';
import Tag from './Tag';
import UserItemSmall from './UserItemSmall';

function PostItemLarge({ post }) {
  return post ? (
    <CustomPaper sx={{ marginBottom: '1rem' }}>
      <Card elevation={0} sx={{ background: 'transparent' }}>
        <CardHeader
          title={
            <Typography variant="h5" component="h3">
              {post.title}
            </Typography>
          }
          subheader={`Skrivet: ${toDateTimeString(post.createdAt)}`}
          avatar={<UserItemSmall user={post.author} />}></CardHeader>
        <CardMedia
          component="img"
          image={
            post.imageUrl || `${process.env.PUBLIC_URL}/images/placeholder.png`
          }
          alt={`Bild till ${post.title}`}
        />
        <CardContent>
          <Box display="flex" gap=".3rem" marginBottom="1rem">
            {post.tags &&
              post.tags.map((tag) => <Tag key={tag} tagName={tag}></Tag>)}
          </Box>
          <Typography variant="body2">{post.body}</Typography>
        </CardContent>
      </Card>
    </CustomPaper>
  ) : (
    <Typography>Inlägg saknas</Typography>
  );
}

export default PostItemLarge;
