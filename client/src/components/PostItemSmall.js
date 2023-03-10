import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { toDateTimeString, truncate } from '../formatHelper';
import { CustomPaper } from './SmallComponents';
import Tag from './Tag';
import UserItemSmall from './UserItemSmall';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function PostItemSmall({ post }) {
  return (
    <CustomPaper sx={{ marginBottom: '1rem' }}>
      <Card elevation={0} sx={{ background: 'transparent' }}>
        <CardHeader
          title={
            <Typography variant="h5" component="h3">
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </Typography>
          }
          subheader={`Skrivet: ${toDateTimeString(post.createdAt)}`}
          avatar={
            <UserItemSmall
              style={{
                minWidth: '7rem',
                paddingRight: '1rem',
                borderRight: `1px solid ${grey[400]}`
              }}
              user={post.author}
            />
          }></CardHeader>
        <CardMedia
          component="img"
          height="200"
          image={
            post.imageUrl || `${process.env.PUBLIC_URL}/images/placeholder.png`
          }
          alt={`Bild till ${post.title}`}
        />
        <CardContent>
          <Box display="flex" gap=".3rem">
            {post.tags &&
              post.tags.map((tag) => <Tag key={tag} tagName={tag}></Tag>)}
          </Box>
          <Typography variant="body2">{truncate(post.body, 200)}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link to={`/posts/${post.id}`}>
            <Button endIcon={<ChevronRightIcon />} size="small" color="primary">
              Läs mer
            </Button>
          </Link>
        </CardActions>
      </Card>
    </CustomPaper>
  );
}

export default PostItemSmall;
