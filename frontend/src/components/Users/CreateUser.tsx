import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { USER_POST } from "../../services/userApi";
import SecondaryButton from "../common/buttom/SecondaryButton";
import PrimaryTextField from "../common/fields/PrimaryTextField";
import ControlNavBar from "../common/navBar/ControlNavBar";
import FormPaper from "../common/paper/FormPaper";
import FormPaperActions from "../common/paper/FormPaperActions";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IUser {
  name: string;
  email: string;
  role: number;
  password: string;
}

function CreateUser() {
  let navigate = useNavigate();
  const { request } = useFetch();

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    role: 0,
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setUser({ ...user, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const role = Number(event.target.value);
    setUser({ ...user, role: role });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = USER_POST({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate("/control/users/");
  }

  return (
    <Container>
      <ControlNavBar />
      <FormPaper title={"Adicionar novo usuário"} mediumPaper>
        <Box sx={{ marginLeft: "30px", marginRight: "30px" }}>
          <PrimaryTextField
            margin="normal"
            value={user.name}
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
            value={user.email}
            onChange={handleInputChanges}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
            text={""}
          />

          <Select
            fullWidth
            labelId="role"
            id="role"
            value={`${user.role}`}
            label="Tipo de perfil"
            onChange={handleSelectChange}
            variant="outlined"
            sx={{
              marginBottom: "12px",
            }}
          >
            <MenuItem value={1}>Administrador</MenuItem>
            <MenuItem value={0}>Editor</MenuItem>
          </Select>

          <PrimaryTextField
            margin="normal"
            value={user.password}
            onChange={handleInputChanges}
            required
            type="password"
            fullWidth
            id="password"
            label="Senha"
            name="password"
            autoFocus
            text={""}
          />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate("/control/users/")}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>CRIAR</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default CreateUser;
