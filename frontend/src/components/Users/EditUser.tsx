import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { USER_GET_ID, USER_DELETE, USER_PUT } from "../../services/userApi";
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
  password?: string;
  role?: number;
}

function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
  });

  const { request } = useFetch();

  useEffect(() => {
    async function fetchUser() {
      const { url, options } = USER_GET_ID(id ? id : "");
      const { json } = await request(url, options);

      setUser({
        name: json.user.name,
        email: json.user.email,
        role: json.user.role,
      });
    }

    fetchUser();
  }, [request, id]);

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setUser({ ...user, [name]: value });
  };

  const deleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirm = window.confirm(
      `Tem certeza que deseja deletar: ${user.name} ? `
    );
    if (confirm) {
      const { url, options } = USER_DELETE(id ? id : "");
      const { response } = await request(url, options);
      if (response?.ok) navigate("/control/users/");
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = USER_PUT(id ? id : "", {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    const { response } = await request(url, options);

    if (response?.ok) navigate("/control/users");
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    const role = Number(event.target.value);
    setUser({ ...user, role: role });
  };

  return (
    <Container>
      <ControlNavBar />

      <FormPaper title={"Editar Usuário"} mediumPaper>
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
            name="email"
            label="Email"
            type="text"
            id="email"
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
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            text={""}
          />
        </Box>

        <FormPaperActions>
          <SecondaryButton onClick={() => navigate("/control/users/")}>
            Voltar
          </SecondaryButton>

          <SecondaryButton onClick={deleteUser}>Deletar</SecondaryButton>

          <SecondaryButton onClick={handleSubmit}>Salvar</SecondaryButton>
        </FormPaperActions>
      </FormPaper>
    </Container>
  );
}

export default EditUser;
