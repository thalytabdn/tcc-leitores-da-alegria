import React, { useState, useEffect } from "react";
import { Box, Button, Container } from "@mui/material";
import Logo from "../assets/images/logo.svg";
import PrimaryTextField from "../components/common/fields/PrimaryTextField";
import Alert from "@mui/material/Alert";
import Subtitle from "../components/common/text/Subtitle";
import { useNavigate } from "react-router-dom";
import { USER_LOGIN } from "../services/userApi";
import { isAuth, setField } from "../utils/localStorageService";
import useFetch from "../Hooks/useFetch";
import { useSessionContext } from "../contexts/SessionContext";

function Login() {
  const navigate = useNavigate();
  const isAuthenticated = isAuth();
  const [invalidLogin, setInvalidLogin] = useState(false);

  const { request } = useFetch();

  const [sessionContext, updateSessionContext] = useSessionContext();

  if (sessionContext.redirectPath === "") {
    updateSessionContext({ ...sessionContext, redirectPath: "/control" });
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/control");
    }
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.id;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { url, options } = USER_LOGIN({
      email: user.email,
      password: user.password,
    });
    const response = await request(url, options);

    if (response.response.ok) {
      const data = await response.json;
      setField("token", data.token);
      setField("name", data.user.name);
      setField("email", data.user.email);
      setField("role", data.user.role);
      setField("id", data.user._id);
      updateSessionContext({ ...sessionContext, isAuthenticated: true });
      navigate(sessionContext.redirectPath);
    } else {
      setInvalidLogin(true);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: 3,
          }}
        >
          <Box sx={{ m: 1 }}>
            <img src={Logo} width={80} alt="logo leitores" />
          </Box>
          <Subtitle text="Log in" />

          <Box component="form" onSubmit={handleSubmit}>
            <PrimaryTextField
              margin="normal"
              value={user.email}
              onChange={handleInputChanges}
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              text={""}
            />

            <PrimaryTextField
              margin="normal"
              value={user.password}
              onChange={handleInputChanges}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              text={""}
            />

            <Button
              type="submit"
              fullWidth
              onClick={() => handleSubmit}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontSize: "14px",
                background: "#C7212F",
                "&.MuiButton-root:hover": {
                  background: "#C7212F",
                },
              }}
            >
              Entrar
            </Button>
            <Alert
              severity="error"
              sx={{ justifyContent: "center", alignItems:'center', background: "transparent", display: invalidLogin ? 'flex' : 'none' }}
            >
              Email ou senha incorretos !
            </Alert>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
