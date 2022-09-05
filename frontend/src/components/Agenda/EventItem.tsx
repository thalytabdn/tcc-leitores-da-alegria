import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import SecondaryTitle from '../common/text/SecondaryTitle';
import Subtitle from '../common/text/Subtitle';
import formatDate from '../../utils/utils';
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

interface EventProps {
  local: string;
  date: string;
  id?: string;
  time: string;
  edit?: boolean;
  readersName: string;
  bookName: string;
  bookImage: string;
  bookDescription: string;
}

const verifyDate = (date: string) => {
  let result = <Subtitle text="" />;
  if (new Date(date) < new Date()) {
    result = (
      <Box sx={{display: 'flex' }}>
            
        <EventBusyOutlinedIcon sx= {{marginRight:"8px", color:'#C7212F' }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            textAlign: 'left',
            marginBottom: '8px',
            color: '#C7212F'
          }}
        >
          Evento já aconteceu
        </Typography>
      </Box>
    );
  }

  return result;
};

function EventItem({ local, id, date, time, readersName, bookName, bookImage, edit, bookDescription, ...props }: EventProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 'auto', justifyContent: 'space-around', marginBottom: '30px' }}>
      <Box>
        <Avatar  variant="square" alt={bookName} src={bookImage} sx={{ width: 150, height: 220, marginBottom: '20px', boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)" }} />
      </Box>

      <Box sx={{ width: '70%' }}>
        <SecondaryTitle sx={{ marginBottom: '8px', color: 'red' }} edit={edit} id={id} text={bookName} />

        <Subtitle text={`Descrição do livro: ${bookDescription}`} />

        <Subtitle text={`Local: ${local}`} />
        <Subtitle text={`Horário: ${time}`} />
        <Subtitle text={`Data: ${formatDate(new Date(date))}`} />
        <Subtitle text={`Leitor(a): ${readersName}`} />

        {verifyDate(date)}
      </Box>
    </Box>
  );
}

export default EventItem;
