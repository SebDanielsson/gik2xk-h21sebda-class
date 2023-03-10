import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PostList from '../components/PostList';

function Posts() {
  const location = useLocation();
  console.log(location);
  return (
    <Container maxWidth="md">
      <PostList pathname={location.pathname} />
    </Container>
  );
}

export default Posts;
