import { Container} from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../common/navBar/NavBar'
import PrimaryTitle from '../common/text/PrimaryTitle'
import api from "../../services/api";
import EventItem from './EventItem'

interface Event {
  id: string;
  local: string;
  date: string;
  time: string;
  readersName: string;
  bookName: string;
  bookImage: string;
  bookDescription: string;
}


function Schedule() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    api.get('/events')
        .then(response => {
            const eventsData = response.data.events;
            setEvents(eventsData);                
        });
  }, [])

  return (
    <Container sx={{paddingBottom: '30px'}}>
      <NavBar/>
      <Container  sx={{marginTop: '30px'}}>
        <PrimaryTitle text="Próximas leituras"/>

        {events.map((event, index) => {
          return (
            <EventItem key={index} local={event.local} date={event.date} time={event.time} readersName={event.readersName} bookName={event.bookName} bookImage={event.bookImage} bookDescription={event.bookDescription}/>
          )
        })}
        
      </Container>
    </Container>
  )
}

export default Schedule