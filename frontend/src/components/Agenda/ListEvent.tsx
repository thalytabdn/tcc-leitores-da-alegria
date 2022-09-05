import React, { useEffect, useState } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import PrimaryTitle from '../common/text/PrimaryTitle';
import api from '../../services/api';
import EventItem from './EventItem';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ControlNavBar from '../common/navBar/ControlNavBar';

interface IEvent {
  _id: string;
  local: string;
  date: string;
  time: string;
  readersName: string;
  bookName: string;
  bookImage: string;
  bookDescription: string;
}

function ListEvent() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    api.get('/events').then((response) => {
      const eventsData = response.data.events;
      setEvents(eventsData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Próximas leituras" />

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
          Adicionar nova leitura
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

      {events.map((event, index) => {
        return (
          <EventItem
            edit
            id={event._id}
            key={index}
            local={event.local}
            date={event.date}
            time={event.time}
            readersName={event.readersName}
            bookName={event.bookName}
            bookImage={event.bookImage}
            bookDescription={event.bookDescription}
          />
        );
      })}
    </Container>
  );
}

export default ListEvent;
