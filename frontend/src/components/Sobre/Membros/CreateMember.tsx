import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import { MEMBER_POST } from '../../../services/memberApi';
import SecondaryButton from '../../common/buttom/SecondaryButton';
import PrimaryTextField from '../../common/fields/PrimaryTextField';
import ControlNavBar from '../../common/navBar/ControlNavBar';
import FormPaper from '../../common/paper/FormPaper';
import FormPaperActions from '../../common/paper/FormPaperActions';


interface IMember {
  name: string;
  image: string;
  description: string;
}

function CreateMember() {
  let navigate = useNavigate();
  const { request } = useFetch();

  const [member, setMember] = useState<IMember>({
    name: '',
    image: '',
    description: ''
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setMember({ ...member, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = MEMBER_POST({
      name: member.name,
      image: member.image,
      description: member.description
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/members/');
  }

  return (
    <Container >
      <ControlNavBar />

      <FormPaper title={'Adicionar novo membro'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField margin="normal" value={member.name} onChange={handleInputChanges} required fullWidth id="name" label="Nome" name="Nome" autoFocus text={''} />

          <PrimaryTextField margin="normal" value={member.description} onChange={handleInputChanges} required fullWidth id="description" label="Descrição" name="description" autoFocus text={''} />

          <PrimaryTextField margin="normal" value={member.image} onChange={handleInputChanges} required fullWidth id="image" label="Url da imagem" name="image" autoFocus text={''} />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/members/')}>Voltar</SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>CRIAR</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default CreateMember;
