import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { EVENT_GET_ID, EVENT_PUT, EVENT_DELETE } from '../../services/eventApi';
import SecondaryButton from '../common/buttom/SecondaryButton';
import PrimaryTextField from '../common/fields/PrimaryTextField';
import FormPaper from '../common/paper/FormPaper';
import FormPaperActions from '../common/paper/FormPaperActions';
import useFetch from '../../Hooks/useFetch'

interface IEvent {
  local: string;
  date: Date;
  time: string;
  readersName: string;
  bookName: string;
  bookImage: string;
  bookDescription: string;
}

function EditEvent() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [event, setEvent] = useState<IEvent>({
    local: '',
    date: new Date(),
    time: '',
    readersName: '',
    bookName: '',
    bookImage: '',
    bookDescription: ''
  });

  const {  request } = useFetch();

  useEffect(() => {
    async function fetchEvent() {
      const { url, options } = EVENT_GET_ID(id ? id : '');
      const { json } = await request(url, options);

      setEvent({
        local: json.event.local,
        date: json.event.date,
        time: json.event.time,
        readersName: json.event.readersName,
        bookName: json.event.bookName,
        bookDescription: json.event.bookDescription,
        bookImage: json.event.bookImage,
      });
    }

    fetchEvent();
  }, [request, id]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setEvent({ ...event, [name]: value });
  };

  const deleteEvent= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const confirm = window.confirm(
      `Tem certeza que deseja deletar a leitura do livro: ${event.bookName} ? `
    );
    if (confirm) {
      const { url, options } = EVENT_DELETE(id ? id : '');
      const { response } = await request(url, options);
      if (response?.ok) navigate('/control/events/');
    }

  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = EVENT_PUT(id ? id : '', {
      local: event.local,
      date: event.date,
      time: event.time,
      readersName: event.readersName,
      bookName: event.bookName,
      bookDescription: event.bookDescription,
      bookImage: event.bookImage,

    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/events');
  }

  function formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  return (
    <Container sx={{ marginTop: '30px', paddingBottom: '30px' }}>
      <FormPaper  title={'Editar Leitura'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField
            margin="normal"
            value={event.bookName}
            onChange={handleInputChanges}
            required
            fullWidth
            id="bookName"
            label="Nome do livro"
            name="Nome do livro"
            autoFocus
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={event.bookDescription}
            onChange={handleInputChanges}
            required
            fullWidth
            name="description"
            label="Descrição"
            type="text"
            id="bookDescription"
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={event.readersName}
            onChange={handleInputChanges}
            required
            fullWidth
            name="description"
            label="Nome do(a) leitor(a)"
            type="text"
            id="readersName"
            text={''}
          />
          
          <PrimaryTextField
            margin="normal"
            value={event.bookImage}
            onChange={handleInputChanges}
            required
            fullWidth
            name="bookImage"
            label="Url da imagem"
            type="text"
            id="bookImage"
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={event.local}
            onChange={handleInputChanges}
            required
            fullWidth
            name="local"
            label="Local"
            type="text"
            id="local"
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={formatDate(event.date)}
            onChange={handleInputChanges}
            required
            fullWidth
            name="data"
            label="Data"
            type="Date"
            id="date"
            text={''}
          />

          <PrimaryTextField margin="normal" value={event.time} onChange={handleInputChanges} required fullWidth name="data" label="Horário" type="Time" id="time" text={''} />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/events/')}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={deleteEvent}>
            Deletar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default EditEvent;
