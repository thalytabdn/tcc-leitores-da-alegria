import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import NavBar from '../common/navBar/NavBar'
import PrimaryTitle from '../common/text/PrimaryTitle'
import Subtitle from '../common/text/Subtitle'
import AudioBookItem from './AudioBookItem'

interface AudioBook {
  id: string,
  title: string,
  description: string,
  url: string,
}

function AudioBooks() {
  const [audioBooks, setAudioBooks] = useState<AudioBook[]>([]);

  useEffect(() => {
    api.get('/audioBooks')
        .then(response => {
            const audioBooksData = response.data.audioBooks;
            setAudioBooks(audioBooksData);                
        });
  }, [])

  return (
    <Container sx={{paddingBottom: '30px'}}>
      <NavBar/>
      <Container  sx={{marginTop: '30px'}}>
        
        <Box sx={{marginBottom: '30px'}}>
          <PrimaryTitle text="AudioBooks"/>
          <Subtitle text='Estamos trabalhando para disponibilizar nossos AudioBooks, em breve publicaremos aqui ! :)'/>
          <Subtitle text='Até lá você pode conferir alguns dos audioBooks sugeridos abaixo:'/>
        </Box>

        {audioBooks.map((audioBook) => {
          return (
            <AudioBookItem key={audioBook.id} name={audioBook.title} description={audioBook.description} url={`Url: ${audioBook.url}`}/>
          )
        })}

        
      </Container>
    </Container>
  )
}

export default AudioBooks