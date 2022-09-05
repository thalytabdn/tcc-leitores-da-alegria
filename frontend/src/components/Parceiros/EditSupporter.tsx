import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { SUPPORTER_GET_ID, SUPPORTER_PUT, SUPPORTER_DELETE } from '../../services/supporterApi';
import SecondaryButton from '../common/buttom/SecondaryButton';
import PrimaryTextField from '../common/fields/PrimaryTextField';
import FormPaper from '../common/paper/FormPaper';
import FormPaperActions from '../common/paper/FormPaperActions';
import useFetch from '../../Hooks/useFetch'
import ControlNavBar from '../common/navBar/ControlNavBar';


interface ISupporter {
  name: string;
  description: string;
  image: string;
}

function EditSupporter() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [supporter, setSupporter] = useState<ISupporter>({
    name: '',
    image: '',
    description: ''
  });

  const {  request } = useFetch();

  useEffect(() => {
    async function fetchSupporter() {
      const { url, options } = SUPPORTER_GET_ID(id ? id : '');
      const { json } = await request(url, options);

      setSupporter({
        name: json.supporter.name,
        description: json.supporter.description,
        image: json.supporter.image,
      });
    }

    fetchSupporter();
  }, [request, id]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setSupporter({ ...supporter, [name]: value });
  };

  const deleteSupporter= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const confirm = window.confirm(
      `Tem certeza que deseja deletar: ${supporter.name} ? `
    );
    if (confirm) {
      const { url, options } = SUPPORTER_DELETE(id ? id : '');
      const { response } = await request(url, options);
      if (response?.ok) navigate('/control/supporters/');
    }

  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = SUPPORTER_PUT(id ? id : '', {
      name: supporter.name,
      image: supporter.image,
      description: supporter.description,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/supporters');
  }


  return (
    <Container >
      <ControlNavBar/>
      
      <FormPaper  title={'Editar Parceiro'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField
            margin="normal"
            value={supporter.name}
            onChange={handleInputChanges}
            required
            fullWidth
            id="name"
            label="Nome"
            name="Nome"
            autoFocus
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={supporter.description}
            onChange={handleInputChanges}
            required
            fullWidth
            name="description"
            label="Benefícios"
            type="text"
            id="description"
            text={''}
          />

          <PrimaryTextField
            margin="normal"
            value={supporter.image}
            onChange={handleInputChanges}
            required
            fullWidth
            name="image"
            label="Url da imagem"
            type="text"
            id="image"
            text={''}
          />

          
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/supporters/')}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={deleteSupporter}>
            Deletar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default EditSupporter;
