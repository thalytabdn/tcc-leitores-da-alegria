import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { FORM_GET, FORM_PUT} from '../../services/formsApi';
import SecondaryButton from '../common/buttom/SecondaryButton';
import PrimaryTextField from '../common/fields/PrimaryTextField';
import FormPaper from '../common/paper/FormPaper';
import FormPaperActions from '../common/paper/FormPaperActions';
import useFetch from '../../Hooks/useFetch'

interface IForm {
  subscription: string;
}

function EditFormSubscription() {
  let navigate = useNavigate();

  const  [id, setId]  = useState('');
  const [form, setForm] = useState<IForm>({
    subscription: '',
  });

  
  const { request } = useFetch();

  useEffect(() => {
    async function fetchForm() {
      const { url, options } = FORM_GET();
      const { json } = await request(url, options);

      setId(json.forms[0]._id)
      
      setForm({
        subscription: json.forms[0].subscription,
      });
    }
    
    fetchForm();
  });
  
  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setForm({ ...form, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = FORM_PUT(id, {
      subscription: form.subscription
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/forms');
  }

  return (
    <Container sx={{ marginTop: '30px' }}>
      <FormPaper  title={'Editar formulário inscrição'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField
            margin="normal"
            value={form.subscription}
            onChange={handleInputChanges}
            required
            fullWidth
            id="subscription"
            label="Link formulário contrato"
            name="subscription"
            autoFocus
            text={''}
          />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate('/control/forms/')}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}


export default EditFormSubscription