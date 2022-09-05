import React from "react";
import { Container, Grid, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import TextSnippetIconOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import PeopleIcon from "@mui/icons-material/People";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayLessonOutlinedIcon from "@mui/icons-material/PlayLessonOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ControlNavBar from "../components/common/navBar/ControlNavBar";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import { Typography } from "@mui/material";
import { havePermission  } from "../utils/localStorageService";

const OptionCard = styled(Grid, { label: "OptionCard" })({
  margin: "12px",
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.3)",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "15px",
  minWidth: "150px",
  cursor: "pointer",
});

const CardTitle = styled(Typography, { label: "CardTitle" })({
  fontWeight: "600",
  marginBottom: "15px",
  textAlign: "center",
});

function ControlHome() {
  let navigate = useNavigate();
  const isAdmin = havePermission([1]);

  return (
    <Container>
      <ControlNavBar />

      <Container sx={{ marginTop: "30px", width: "60%" }}>
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          <OptionCard item xs={2} onClick={() => navigate("events")}>
            <AutoStoriesOutlinedIcon sx={{ fontSize: "50px" }} />

            <CardTitle variant="h5">Leituras</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("forms")}>
            <TextSnippetIconOutlinedIcon sx={{ fontSize: "50px" }} />

            <CardTitle variant="h5">Formulários</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("members")}>
            <PeopleIcon sx={{ fontSize: "50px" }} />

            <CardTitle variant="h5">Membros</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("supporters")}>
            <HandshakeOutlinedIcon sx={{ fontSize: "50px" }} />

            <CardTitle variant="h5">Parceiros</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("audioBooks")}>
            <PlayLessonOutlinedIcon sx={{ fontSize: "50px" }} />
            <CardTitle variant="h5">AudioBooks</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("galery")}>
            <PhotoLibraryOutlinedIcon sx={{ fontSize: "50px" }} />
            <CardTitle variant="h5">Galeria</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("infos")}>
            <InfoOutlinedIcon sx={{ fontSize: "50px" }} />
            <CardTitle variant="h5">Infos</CardTitle>
          </OptionCard>

          <OptionCard item xs={2} onClick={() => navigate("config/profile")}>
            <AssignmentIndOutlinedIcon sx={{ fontSize: "50px" }} />
            <CardTitle variant="h5">Configurações de perfil</CardTitle>
          </OptionCard>

          <OptionCard
            item
            xs={2}
            onClick={() => navigate("users")}
            sx={{ display: isAdmin ? "flex" : "none" }}
          >
            <ManageAccountsOutlinedIcon sx={{ fontSize: "50px" }} />
            <CardTitle variant="h5">Usuários do sistema</CardTitle>
          </OptionCard>
        </Grid>
      </Container>
    </Container>
  );
}

export default ControlHome;
