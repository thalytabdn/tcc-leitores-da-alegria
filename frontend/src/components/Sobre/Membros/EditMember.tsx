import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import SecondaryButton from "../../common/buttom/SecondaryButton";
import PrimaryTextField from "../../common/fields/PrimaryTextField";
import FormPaper from "../../common/paper/FormPaper";
import FormPaperActions from "../../common/paper/FormPaperActions";
import ControlNavBar from "../../common/navBar/ControlNavBar";
import {
  MEMBER_GET_ID,
  MEMBER_PUT,
  MEMBER_DELETE,
} from "../../../services/memberApi";

interface IMember {
  name: string;
  description: string;
  image: string;
}

function EditMember() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [member, setMember] = useState<IMember>({
    name: "",
    image: "",
    description: "",
  });

  const { request } = useFetch();

  useEffect(() => {
    async function fetchMember() {
      const { url, options } = MEMBER_GET_ID(id ? id : '');
      const { json } = await request(url, options);

      setMember({
        name: json.member.name,
        description: json.member.description,
        image: json.member.image,
      });
    }

    fetchMember();
  }, [request, id]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setMember({ ...member, [name]: value });
  };

  const deleteMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirm = window.confirm(
      `Tem certeza que deseja deletar: ${member.name} ? `
    );
    if (confirm) {
      const { url, options } = MEMBER_DELETE(id ? id : '');
      const { response } = await request(url, options);
      if (response?.ok) navigate("/control/members/");
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = MEMBER_PUT(id ? id : '', {
      name: member.name,
      image: member.image,
      description: member.description,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate("/control/members");
  }

  return (
    <Container>
      <ControlNavBar />

      <FormPaper title={"Editar Membro"} mediumPaper>
        <Box sx={{ marginLeft: "30px", marginRight: "30px" }}>
          <PrimaryTextField
            margin="normal"
            value={member.name}
            onChange={handleInputChanges}
            required
            fullWidth
            id="name"
            label="Nome"
            name="Nome"
            autoFocus
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={member.description}
            onChange={handleInputChanges}
            required
            fullWidth
            name="description"
            label="Descrição"
            type="text"
            id="description"
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={member.image}
            onChange={handleInputChanges}
            required
            fullWidth
            name="image"
            label="Url da imagem"
            type="text"
            id="image"
            text={""}
          />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate("/control/members/")}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={deleteMember}>Deletar</SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default EditMember;
