import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { AUDIOBOOK_POST } from '../../services/audioBookApi';
import SecondaryButton from '../common/buttom/SecondaryButton';
import PrimaryTextField from '../common/fields/PrimaryTextField';
import ControlNavBar from '../common/navBar/ControlNavBar';
import FormPaper from '../common/paper/FormPaper';
import FormPaperActions from '../common/paper/FormPaperActions';

interface IAudioBook {
  title: string;
  url: string;
  description: string;
}

function CreateAudioBook() {
  let navigate = useNavigate();
  const {  request } = useFetch();

  const [audioBook, setAudioBook] = useState<IAudioBook>({
    title: '',
    url: '',
    description: ''
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setAudioBook({ ...audioBook, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = AUDIOBOOK_POST({
      title: audioBook.title,
      url: audioBook.url,
      description: audioBook.description
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/audioBooks/');
  }

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <FormPaper title={'Adicionar Audiobook'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField margin="normal" value={audioBook.title} onChange={handleInputChanges} required fullWidth id="title" label="Título" name="Título" autoFocus text={''} />

          <PrimaryTextField margin="normal" value={audioBook.description} onChange={handleInputChanges} required fullWidth id="description" label="Descrição" name="description" autoFocus text={''} />

          <PrimaryTextField margin="normal" value={audioBook.url} onChange={handleInputChanges} required fullWidth id="url" label="Url para audiobook" name="url" autoFocus text={''} />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/audioBooks/')}>Voltar</SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>CRIAR</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default CreateAudioBook;
