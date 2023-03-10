import { Alert, Button, Chip, Snackbar, TextField } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TagField from '../components/TagField';
import { create, getOne, remove, update } from '../models/PostModel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

function PostEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const postId = params.id;
  const emptyPost = {
    id: 0,
    title: '',
    body: '',
    imageUrl: '',
    tags: []
  };
  const [post, setPost] = useState(emptyPost);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (!isNaN(postId)) {
      getOne(postId).then((post) =>
        setPost({ ...post, imageUrl: post.imageUrl || '' })
      );
    } else {
      setPost(emptyPost);
    }
    // eslint-disable-next-line
  }, [postId]);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newPost = { ...post, [name]: value };
    setPost(newPost);
  }
  function onSave() {
    if (post.id === 0) {
      create({ ...post, userId: 2 }).then(() => setAlertOpen(true));
    } else {
      update(post).then(() => setAlertOpen(true));
    }
  }

  function onDelete() {
    remove(post.id).then(() =>
      navigate('/', { state: { message: 'Inlägget togs bort' } })
    );
  }
  function onTagDelete(tagToDelete) {
    console.log(tagToDelete);
    const newTags = post.tags.filter((tag) => tag !== tagToDelete);

    setPost({ ...post, tags: newTags });
  }

  function onTaggAdd(tagString) {
    //splitta arrayen vid kommatecken
    const tagArray = tagString.split(',');

    //trimma whitespace
    const trimmedArray = tagArray.map((tag) => tag.trim());
    //kontrollera unik
    //lägga till i post tags
    const mergedArray = [
      ...post.tags,
      ...trimmedArray.filter((tag) => !post.tags.includes(tag))
    ];

    setPost({ ...post, tags: mergedArray });
  }
  return (
    <Container maxWidth="md">
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => {
          setAlertOpen(false);
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Inlägget har sparats!
        </Alert>
      </Snackbar>
      <form>
        <TextField
          fullWidth
          value={post.title}
          onChange={onChange}
          name="title"
          id="title"
          label="Titel"
          variant="standard"
          margin="normal"
        />

        <TextField
          fullWidth
          value={post.body}
          onChange={onChange}
          name="body"
          id="body"
          multiline
          minRows={4}
          label="Innehåll"
          variant="standard"
          margin="normal"
        />
        <TextField
          fullWidth
          value={post.imageUrl}
          onChange={onChange}
          name="imageUrl"
          id="imageUrl"
          label="Url till bild"
          variant="standard"
          margin="normal"
        />
        <br />
        <TagField onSave={onTaggAdd}></TagField>
        {post.tags.length > 0 &&
          post.tags.map((tag) => (
            <Chip
              onDelete={() => onTagDelete(tag)}
              key={tag}
              label={tag}></Chip>
          ))}
        <Box display="flex" justifyContent="space-between" marginTop="1rem">
          <Button
            startIcon={<ChevronLeftIcon />}
            onClick={() => navigate(-1)}
            variant="contained">
            Tillbaka
          </Button>
          <Box>
            {post.id !== 0 && (
              <Button
                startIcon={<DeleteIcon />}
                sx={{ marginRight: '1rem' }}
                color="warning"
                onClick={onDelete}
                variant="contained">
                Ta bort
              </Button>
            )}
            <Button
              startIcon={<SaveIcon />}
              onClick={onSave}
              variant="contained">
              Spara
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}

export default PostEdit;
