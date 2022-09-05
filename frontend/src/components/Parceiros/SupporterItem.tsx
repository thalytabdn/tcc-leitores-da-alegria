import { Avatar, Box } from '@mui/material';
import React from 'react';
import SecondaryTitle from '../common/text/SecondaryTitle';
import Subtitle from '../common/text/Subtitle';

interface SupporterProps {
  id?: string;
  edit?: boolean;
  name: string;
  image: string;
  description: string;
}

function SupporterItem({ id, name, image, edit, description, ...props }: SupporterProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 'auto', justifyContent: 'space-around', marginBottom: '30px' }}>
      <Box>
        <Avatar alt={name} src={image} sx={{ width: 150, height: 150, marginBottom: '20px' }} />
      </Box>

      <Box sx={{ width: '70%' }}>
        <SecondaryTitle edit={edit} id={id} text={name}></SecondaryTitle>

        <Subtitle text={`Benefícios: ${description}`} />
      </Box>
    </Box>
  );
}

export default SupporterItem;
