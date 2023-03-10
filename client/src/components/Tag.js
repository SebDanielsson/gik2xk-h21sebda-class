import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Tag({ tagName }) {
  const navigate = useNavigate();
  return (
    <>
      <Chip
        onClick={() => navigate(`/tags/${tagName}/posts`)}
        color="primary"
        sx={{ cursor: 'pointer' }}
        key={tagName}
        label={tagName}></Chip>
    </>
  );
}

export default Tag;
