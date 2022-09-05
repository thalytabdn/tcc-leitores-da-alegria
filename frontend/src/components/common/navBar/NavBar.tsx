import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { ButtonBase } from "@mui/material";
import Logo from "../../../assets/images/logo.svg";

function NavBar() {
  const pages = [
    "Agenda",
    "Contrate um leitor",
    "Seja um leitor",
    "AudioBooks",
    "Galeria",
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar elevation={0} position="static" sx={{ backgroundColor: "#ffff" }}>
        <Container
          sx={{ justifyContent: "space-between", padding: "0px !important" }}
        >
          <Toolbar disableGutters>
            {/* grande */}
            <ButtonBase focusRipple component={Link} to="/">
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                }}
              >
                <img src={Logo} alt="logo" />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "700",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.1px",
                  fontSize: "22px",
                  marginLeft: "8px",
                  marginRight: "40px",
                  lineHeight: "39px",
                  color: "#C7212F",
                }}
              >
                Leitores da Alegria
              </Typography>
            </ButtonBase>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "#C7212F" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{fontSize:'25px'}}/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={`/${page}`}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
                {/* pequeno */}
                <MenuItem
                  key={"Sobre"}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={"/Sobre"}
                >
                  <Typography textAlign="center">Sobre nós</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <ButtonBase focusRipple component={Link} to="/">
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                }}
              >
                <img src={Logo} alt="logo" />
              </Box>
              <Typography
                justifyContent={"center"}
                variant="h6"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "700",
                  letterSpacing: "0.1px",
                  fontSize: "22px",
                  marginLeft: "8px",
                  marginRight: "40px",
                  lineHeight: "39px",
                  color: "#C7212F",
                  whiteSpace: 'nowrap'
                }}
              >
                Leitores da Alegria
              </Typography>
            </ButtonBase>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Link}
                  to={`/${page}`}
                  sx={{
                    "&.MuiMenuItem-root:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontWeight: "700",
                      fontSize: "15px",
                      lineHeight: "29px",
                      color: "#212121",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem
                key={"Sobre"}
                component={Link}
                to={"/Sobre"}
                sx={{
                  "&.MuiMenuItem-root:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Typography
                  textAlign="center"
                  sx={{
                    fontWeight: "700",
                    fontSize: "15px",
                    lineHeight: "29px",
                    color: "#212121",
                    border: "4px solid #C7212F",
                    borderRadius: "30px",
                    width: "110px",
                    margin: "0px",
                    height: "32px",
                    marginLeft: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Sobre nós
                </Typography>
              </MenuItem>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
