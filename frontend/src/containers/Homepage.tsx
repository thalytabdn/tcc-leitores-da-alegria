import React from "react";
import { Grid, Typography } from "@mui/material";
import NavBar from "../components/common/navBar/NavBar";
import { Container } from "@mui/system";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LogoHome from "../assets/images/logo.svg";

const infos = [
  {
    title: "Como surgimos ?",
    text: "O projeto surgiu com o objetivo de incentivar a leitura em crianças e adolescentes e  trazer mais pessoas para esse mundo tão incrível é gratificante",
    last: false,
  },
  {
    title: "Como fazer parte ?",
    text: "Realize o cadastro com seus dados pessoais, livros que já possui em sua casa e seus horários disponíveis. Acesse a página de cadastro no menu acima.",
    last: false,
  },
  {
    title: "Como contratar ?",
    text: "Para solicitar um leitor informando a série que a leitura será feita, o horário e o livro desejado. Oferecemos a opção de pacotes, mensais, semestrais ou anuais. Acesse a página de contrato no menu acima.",
    last: true,
  },
];

function HomePage() {
  return (
    <Container
      sx={{
        display: "flex",
        height: "100%",
        flexWrap: "wrap",
        alignItems: "space-between",
      }}
    >
      <NavBar />

      <Container
        sx={{
          maxWidth: "416px",
          display: "flex",
          flexWrap: "nowrap",
          height: "50vh",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontSize: { xs: "30px", md: "55px" },
            fontWeight: "700",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Desvende o mundo por meio da leitura.
        </Typography>

        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={LogoHome}
            alt="Logo leitores"
            style={{ width: "140px", margin: "15px" }}
          />
        </Container>
      </Container>

      <Grid
        container
        sx={{
          flexWrap: "wrap",
          minWidth: "384px",
          height: "220px",
          width: "100%",
          backgroundColor: "rgba(64, 64, 64, 0.7)",
          borderRadius: "25px",
          display: { xs: "none", md: "flex" },
          bottom: "0px",
          justifyContent: "space-evenly",
          padding: 0,
        }}
      >
        {infos.map((info) => {
          return (
            <Grid
              item
              key={info.title}
              sx={{
                margin: "20px 0px 20px 20px",
                width: `${info.last ? "240px" : "380px"}`,
                flexWrap: "nowrap",
                display: "flex",
                padding: "0 !important",
                justifyContent: "center",
              }}
            >
              <div>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: "700",
                    fontSize: "2.6rem",
                    color: "#ffff",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {info.title}
                </Typography>

                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontSize: " 1.6rem",
                    color: "#ffff",
                    letterSpacing: "1px",
                  }}
                >
                  {info.text}.
                </Typography>
              </div>

              <NavigateNextIcon
                sx={{
                  color: "#F8D377",
                  fontSize: "12rem",
                  borderRadius: 4,
                  display: `${info.last ? "none" : ""}`,
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Grid
        container
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          gap: "20px",
          marginBottom: "20px",
          justifyContent: "center",
          padding: 0,
        }}
      >
        {infos.map((info) => {
          return (
            <Grid
              item
              key={info.title}
              sx={{
                backgroundColor: "rgba(64, 64, 64, 0.7)",
                borderRadius: "25px",
                width: '90%',
                display: "flex",
                padding: "15px",
                justifyContent: "center",
              }}
            >
              <div>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: "700",
                    fontSize: "20px",
                    color: "#ffff",
                    letterSpacing: "1px",
                    marginBottom: "8px",
                  }}
                >
                  {info.title}
                </Typography>

                <Typography
                  component="div"
                  sx={{
                    fontSize: " 15px",
                    color: "#ffff",
                    letterSpacing: "1px",
                  }}
                >
                  {info.text}.
                </Typography>
              </div>

              
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default HomePage;
