import { Container } from "@mui/material";
import React, { useState } from "react";
import PrimaryTextField from "../common/fields/PrimaryTextField";
import ControlNavBar from "../common/navBar/ControlNavBar";
import PrimaryTitle from "../common/text/PrimaryTitle";
import ROLES from "../../utils/enum/roles";
import SecondaryButton from "../common/buttom/SecondaryButton";
import { PASSWORD_RESET, USER_GET_ID, USER_PUT } from "../../services/userApi";
import useFetch from "../../Hooks/useFetch";
import { getField, setField } from "../../utils/localStorageService";

interface IUser {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  role: number | undefined;
  id: string ;
}

interface IPasswords {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

function Profile() {
  const { request } = useFetch();

  const [passwords, setPasswords] = useState<IPasswords>({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const [user, setUser] = useState<IUser>({
    id: getField("id"),
    name: getField("name"),
    email: getField("email"),
    password: getField("password"),
    role: getField("role"),
  });

  const [edit, setEdit] = useState(false);

  const handleEditClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(!edit);
  };

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setUser({ ...user, [name]: value });
  };

  const handlePasswordsChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setPasswords({ ...passwords, [name]: value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = USER_PUT(getField("id"), {
      name: user.name,
      email: user.email,
    });

    const response = await request(url, options);
    const data = await response.json;

    if (data) {
      setField("name", data.user.name);
      setField("email", data.user.email);
      setEdit(!edit);
    }
  }

  async function changePassword(password: string) {
    if (passwords.newPassword === passwords.newPasswordConfirm) {
      const { url, options } = PASSWORD_RESET({
        id: user.id,
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      const { response } = await request(url, options);
      if (response.ok) alert("Senha atualizada");
      
    } else {
      console.log("confirmação de senha errada");
      // alert a senha e sua confimação devem ser iguais 

    }
  }

  async function handlePasswordUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = USER_GET_ID(getField("id"));

    const response = await request(url, options);
    const password = await response.json.user.password;

    if (password) {
      changePassword(password);
    }
  }

  return (
    <Container sx={{paddingBottom: '55px'}}>
      <ControlNavBar />

      <Container sx={{ marginTop: "30px" }}>
        <PrimaryTitle text="Perfil" handleClick={handleEditClick} />

        <Container sx={{ width: "70%" }}>
          <PrimaryTextField
            margin="normal"
            value={user.name}
            disabled={!edit}
            onChange={handleInputChanges}
            required
            fullWidth
            name="name"
            label="Nome"
            type="text"
            id="name"
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={user.email}
            disabled={!edit}
            onChange={handleInputChanges}
            required
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email"
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={
              Number(user.role) === ROLES.ADMIN ? "Administrador" : "Usuário"
            }
            disabled
            onChange={handleInputChanges}
            required
            fullWidth
            name="role"
            label="Tipo de Perfil"
            type="text"
            id="role"
            text={""}
          />
        </Container>

        <Container
          sx={{
            display: "flex",
            width: "70%",
            justifyContent: "flex-end",
          }}
        >
          <SecondaryButton
            sx={{
              margin: "10px",
              display: edit ? "none" : "flex",
            }}
            onClick={handleEditClick}
          >
            Editar
          </SecondaryButton>

          <SecondaryButton
            onClick={handleEditClick}
            sx={{ margin: "10px", display: edit ? "flex" : "none" }}
          >
            Cancelar
          </SecondaryButton>

          <SecondaryButton
            onClick={handleSubmit}
            sx={{ margin: "10px", display: edit ? "flex" : "none" }}
          >
            Salvar
          </SecondaryButton>
        </Container>
      </Container>

      <Container sx={{ marginTop: "30px" }}>
        <PrimaryTitle text="Alterar senha" handleClick={handleEditClick} />

        <Container sx={{ width: "70%" }}>
          <PrimaryTextField
            margin="normal"
            value={passwords.oldPassword}
            onChange={handlePasswordsChanges}
            required
            fullWidth
            name="name"
            label="Senha antiga"
            type="password"
            id="oldPassword"
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={passwords.newPassword}
            onChange={handlePasswordsChanges}
            required
            fullWidth
            name="nova senha"
            label="Nova senha"
            type="password"
            id="newPassword"
            text={""}
          />

          <PrimaryTextField
            margin="normal"
            value={passwords.newPasswordConfirm}
            onChange={handlePasswordsChanges}
            required
            fullWidth
            name="confirm password"
            label="Confirme a nova senha"
            type="password"
            id="newPasswordConfirm"
            text={""}
          />
        </Container>

        <Container
          sx={{
            display: "flex",
            width: "70%",
            justifyContent: "flex-end",
          }}
        >
          <SecondaryButton
            onClick={handlePasswordUpdate}
            sx={{ margin: "10px" }}
          >
            Atualizar senha
          </SecondaryButton>
        </Container>
      </Container>
    </Container>
  );
}

export default Profile;
