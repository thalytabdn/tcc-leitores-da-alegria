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
import ControlNavBar from '../common/navBar/ControlNavBar';

interface IForm {
  contract: string;
}

function EditForm() {
  let navigate = useNavigate();

  const  [id, setId]  = useState('');
  const [form, setForm] = useState<IForm>({
    contract: '',
  });

  
  const { request } = useFetch();

  useEffect(() => {
    async function fetchForm() {
      const { url, options } = FORM_GET();
      const { json } = await request(url, options);

      setId(json.forms[0]._id)
      
      setForm({
        contract: json.forms[0].contract,
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
      contract: form.contract
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate('/control/forms');
  }

  return (
    <Container >
      <ControlNavBar />

      <FormPaper  title={'Editar formulário contratante'} mediumPaper>
        <Box sx={{ marginLeft: '30px', marginRight: '30px' }}>
          <PrimaryTextField
            margin="normal"
            value={form.contract}
            onChange={handleInputChanges}
            required
            fullWidth
            id="contract"
            label="Link formulário contrato"
            name="contract"
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


export default EditForm