import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import SecondaryButton from '../../common/buttom/SecondaryButton';
import PrimaryTextField from '../../common/fields/PrimaryTextField';
import FormPaper from '../../common/paper/FormPaper';
import FormPaperActions from '../../common/paper/FormPaperActions';
import ControlNavBar from '../../common/navBar/ControlNavBar';
import { INFO_GET_ID, INFO_PUT, INFO_DELETE } from '../../../services/infoApi';

interface IInfo {
  title: string;
  text: string;
}

function EditInfo() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [info, setInfo] = useState<IInfo>({
    title: '',
    text: ''
  });

  const { request } = useFetch();

  useEffect(() => {
    async function fetchInfo() {
      const { url, options } = INFO_GET_ID(id ? id : '');
      const { json } = await request(url, options);

      setInfo({
        title: json.info.title,
        text: json.info.text,
      });
    }

    fetchInfo();
  }, [request, id]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setInfo({ ...info, [name]: value });
  };

  const deleteInfo= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const confirm = window.confirm(
      `Tem certeza que deseja deletar: ${info.title} ? `
    );
    if (confirm) {
      const { url, options } = INFO_DELETE(id ? id : '');
      const { response } = await request(url, options);
      if (response?.ok) navigate('/control/infos/');
    }

  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = INFO_PUT(id ? id : '', {
      title: info.title,
      text: info.text,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/infos');
  }

  return (
    <Container>
      <ControlNavBar />

      <FormPaper  title={'Editar Membro'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField
            margin="normal"
            value={info.title}
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
            value={info.text}
            onChange={handleInputChanges}
            required
            fullWidth
            name="text"
            label="Descrição"
            type="text"
            id="text"
            text={''}
          />

        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/infos/')}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={deleteInfo}>
            Deletar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default EditInfo;
