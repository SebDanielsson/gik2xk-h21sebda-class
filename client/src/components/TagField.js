import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

function TagField({ onSave }) {
  const [tagString, setTagString] = useState('');
  return (
    <Box my=".5rem" display="flex" gap="2rem" alignItems="center">
      <TextField
        sx={{ flexGrow: 1 }}
        size="small"
        name="tags"
        label="Taggar (ange flera separerade med kommatecken)"
        value={tagString}
        onChange={(e) => setTagString(e.target.value)}
      />
      <Button
        size="medium"
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => onSave(tagString)}>
        Lägg till tagg
      </Button>
    </Box>
  );
}

export default TagField;
