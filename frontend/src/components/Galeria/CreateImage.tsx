import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { IMAGE_POST } from '../../services/imageApi';
import SecondaryButton from '../common/buttom/SecondaryButton';
import PrimaryTextField from '../common/fields/PrimaryTextField';
import ControlNavBar from '../common/navBar/ControlNavBar';
import FormPaper from '../common/paper/FormPaper';
import FormPaperActions from '../common/paper/FormPaperActions';

interface IImage {
  title: string;
  url: string;
  description: string;
}

function CreateImage() {
  let navigate = useNavigate();
  const {request } = useFetch();

  const [image, setImage] = useState<IImage>({
    title: '',
    url: '',
    description: ''
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setImage({ ...image, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = IMAGE_POST({
      url: image.url,
      description: image.description
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/galery/');
  }


  return (
    <Container>
      <ControlNavBar />

      <FormPaper title={'Adicionar nova imagem'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField margin="normal" value={image.url} onChange={handleInputChanges} required fullWidth id="url" label="Url da imagem" name="url" autoFocus text={''} />

          <PrimaryTextField margin="normal" value={image.description} onChange={handleInputChanges} required fullWidth id="description" label="Descrição" name="description" autoFocus text={''} />

        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/galery/')}>Voltar</SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>CRIAR</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default CreateImage;
