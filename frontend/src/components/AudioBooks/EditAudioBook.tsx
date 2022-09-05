import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import SecondaryButton from '../common/buttom/SecondaryButton';
import PrimaryTextField from '../common/fields/PrimaryTextField';
import FormPaper from '../common/paper/FormPaper';
import FormPaperActions from '../common/paper/FormPaperActions';
import { AUDIOBOOK_GET_ID, AUDIOBOOK_PUT, AUDIOBOOK_DELETE } from '../../services/audioBookApi';
import ControlNavBar from '../common/navBar/ControlNavBar';


interface IAudioBook {
  title: string;
  description: string;
  url: string;
}

function EditAudioBook() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [audioBook, setAudioBook] = useState<IAudioBook>({
    title: '',
    url: '',
    description: ''
  });

  const { request } = useFetch();

  useEffect(() => {
    async function fetchAudioBook() {
      const { url, options } = AUDIOBOOK_GET_ID(id ? id : '');
      const { json } = await request(url, options);

      setAudioBook({
        title: json.audioBook.title,
        description: json.audioBook.description,
        url: json.audioBook.url,
      });
    }

    fetchAudioBook();
  }, [request, id]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setAudioBook({ ...audioBook, [name]: value });
  };

  const deleteAudioBook= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const confirm = window.confirm(
      `Tem certeza que deseja deletar: ${audioBook.title} ? `
    );
    if (confirm) {
      const { url, options } = AUDIOBOOK_DELETE(id ? id : '');
      const { response } = await request(url, options);
      if (response?.ok) navigate('/control/audioBooks/');
    }

  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = AUDIOBOOK_PUT(id ? id : '', {
      title: audioBook.title,
      url: audioBook.url,
      description: audioBook.description,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/audioBooks');
  }

  return (
    <Container sx={{ paddingBottom: '30px' }} >
      <ControlNavBar />

      <FormPaper  title={'Editar Leitura'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField
            margin="normal"
            value={audioBook.title}
            onChange={handleInputChanges}
            required
            fullWidth
            id="title"
            label="Título"
            name="Título"
            autoFocus
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={audioBook.description}
            onChange={handleInputChanges}
            required
            fullWidth
            name="description"
            label="Descrição"
            type="text"
            id="description"
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={audioBook.url}
            onChange={handleInputChanges}
            required
            fullWidth
            name="url"
            label="Url para audioBook"
            type="text"
            id="url"
            text={''}
          />

          
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/audioBooks/')}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={deleteAudioBook}>
            Deletar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default EditAudioBook;
