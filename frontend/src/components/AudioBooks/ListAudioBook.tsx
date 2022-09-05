import React, { useEffect, useState } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import api from '../../services/api';
import ControlNavBar from '../common/navBar/ControlNavBar';
import PrimaryTitle from '../common/text/PrimaryTitle';
import AudioBookItem from './AudioBookItem';

interface IAudioBook {
  _id: string;
  title: string;
  description: string;
  url: string;
}

function ListAudioBook() {
  const [audioBooks, setAudioBooks] = useState<IAudioBook[]>([]);

  useEffect(() => {
    api.get('/audioBooks').then((response) => {
      const audioBooksData = response.data.audioBooks;
      setAudioBooks(audioBooksData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="AudioBooks" />

        <Typography
          component={Link}
          to={`create`}
          sx={{
            whiteSpaces: 'nowrap',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000',
            textDecoration: 'none'
          }}
        >
          Adicionar novo audioBook
          <IconButton aria-label="Criar">
            <AddIcon
              sx={{
                fontSize: '25pt',
                color: '#C7212F'
              }}
            />
          </IconButton>
        </Typography>
      </Container>

      <Divider sx={{ marginTop: '8px', marginBottom: '30px' }} />

      {audioBooks.map((audioBook) => {
        return (
          <AudioBookItem
            edit
            id={audioBook._id}
            key={audioBook._id}
            name={audioBook.title}
            description={audioBook.description}
            url={audioBook.url}
          />
        );
      })}
    </Container>
  );
}

export default ListAudioBook;
