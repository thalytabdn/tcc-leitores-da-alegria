import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { INFO_POST } from "../../../services/infoApi";
import SecondaryButton from "../../common/buttom/SecondaryButton";
import PrimaryTextField from "../../common/fields/PrimaryTextField";
import ControlNavBar from "../../common/navBar/ControlNavBar";
import FormPaper from "../../common/paper/FormPaper";
import FormPaperActions from "../../common/paper/FormPaperActions";

interface IInfo {
  title: string;
  text: string;
}

function CreateInfo() {
  let navigate = useNavigate();
  const {  request } = useFetch();

  const [info, setInfo] = useState<IInfo>({
    title: "",
    text: "",
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setInfo({ ...info, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = INFO_POST({
      title: info.title,
      text: info.text,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate("/control/infos/");
  }

  return (
    <Container>
      <ControlNavBar />

      <FormPaper title={"Adicionar nova informação"} mediumPaper>
        <Box sx={{ marginLeft: "30px", marginRight: "30px" }}>
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
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={info.text}
            onChange={handleInputChanges}
            required
            fullWidth
            id="text"
            label="Texto"
            name="Texto"
            autoFocus
            text={""}
          />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate("/control/infos/")}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>CRIAR</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default CreateInfo;
