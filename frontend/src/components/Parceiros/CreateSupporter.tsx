import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { SUPPORTER_POST } from "../../services/supporterApi";
import SecondaryButton from "../common/buttom/SecondaryButton";
import PrimaryTextField from "../common/fields/PrimaryTextField";
import ControlNavBar from "../common/navBar/ControlNavBar";
import FormPaper from "../common/paper/FormPaper";
import FormPaperActions from "../common/paper/FormPaperActions";

interface ISupporter {
  name: string;
  image: string;
  description: string;
}

function CreateSupporter() {
  let navigate = useNavigate();
  const { request } = useFetch();

  const [supporter, setSupporter] = useState<ISupporter>({
    name: "",
    image: "",
    description: "",
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setSupporter({ ...supporter, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = SUPPORTER_POST({
      name: supporter.name,
      image: supporter.image,
      description: supporter.description,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate("/control/supporters/");
  }

  return (
    <Container>
      <ControlNavBar />

      <FormPaper title={"Adicionar novo Parceiro"} mediumPaper>
        <Box sx={{ marginLeft: "30px", marginRight: "30px" }}>
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
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={supporter.description}
            onChange={handleInputChanges}
            required
            fullWidth
            id="description"
            label="Benefícios"
            name="description"
            autoFocus
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={supporter.image}
            onChange={handleInputChanges}
            required
            fullWidth
            id="image"
            label="Url da imagem"
            name="image"
            autoFocus
            text={""}
          />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate("/control/supporters/")}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>CRIAR</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default CreateSupporter;
