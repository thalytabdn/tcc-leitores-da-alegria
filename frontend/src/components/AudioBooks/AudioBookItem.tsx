import React from 'react';
import { Box, Typography } from '@mui/material';
import SecondaryTitle from '../common/text/SecondaryTitle';
import Subtitle from '../common/text/Subtitle';

interface AudioBookProps {
  id?: string;
  name: string;
  description: string;
  edit?: boolean;
  url: string;
}

function AudioBookItem({ id, name, url, edit, description, ...props }: AudioBookProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 'auto', marginBottom: '30px', marginLeft: '24px' }}>
      <Box sx={{ width: '70%' }}>
        <SecondaryTitle text={name} id={id} edit={edit} />

        <Subtitle sx={{ marginBottom: '13px' }} text={`Descrição: ${description}`} />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 'normal',
            textAlign: 'left',
            marginBottom: '8px',
          }}
        >
          {url}
        </Typography>
      </Box>
    </Box>
  );
}

export default AudioBookItem;
