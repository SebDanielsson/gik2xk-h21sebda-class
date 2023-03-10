import PostList from '../components/PostList';
import UserList from '../components/UserList';
import TagList from '../components/TagList';
import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';
import './Home.css';
import { CustomPaper } from '../components/SmallComponents';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();

  const message = location?.state?.message;
  const [alertOpen, setAlertOpen] = useState(location.state != null);
  return (
    <>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={() => {
          setAlertOpen(false);
          location.state = null;
        }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Grid container columnSpacing={8} p={2} className="Home">
        <Grid item xs={12} md={8}>
          <Typography variant="h2">Alla inlägg</Typography>
          <PostList></PostList>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box marginBottom="4rem">
            <Typography variant="h2">Användare</Typography>
            <CustomPaper>
              <UserList></UserList>
            </CustomPaper>
          </Box>
          <Box>
            <Typography variant="h2">Taggar</Typography>
            <CustomPaper>
              <TagList></TagList>
            </CustomPaper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
