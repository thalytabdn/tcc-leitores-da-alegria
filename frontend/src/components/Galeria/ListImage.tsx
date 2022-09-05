import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Container, IconButton, Typography } from "@mui/material";
import PrimaryTitle from "../common/text/PrimaryTitle";
import ControlNavBar from "../common/navBar/ControlNavBar";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import useFetch from "../../Hooks/useFetch";
import { IMAGE_DELETE } from "../../services/imageApi";
import { useState } from "react";
import api from "../../services/api";

interface IImage {
  _id: string;
  url: string;
  description: string;
}

export default function ListImage() {
  const [images, setImages] = useState<IImage[]>([]);
  const { request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    api.get('/images').then((response) => {
      const imagesData = response.data.images;
      setImages(imagesData);
    });
  }, []);

  const deleteImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();

    const confirm = window.confirm("Tem certeza que deseja deletar esta imagem ?");
    if (confirm) {
      const { url, options } = IMAGE_DELETE(id ? id : "");
      const { response } = await request(url, options);
      // if (response?.ok) exibir alert confirmando que foi deletado

      if (response?.ok) navigate(0);
    }
  };

  return (
    <Container sx={{ paddingBottom: "30px" }}>
      <ControlNavBar />
      <Container sx={{ marginTop: "30px" }}>
        <PrimaryTitle text="Galeria" />

        <Typography
          component={Link}
          to={`create`}
          sx={{
            whiteSpaces: "nowrap",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#000",
            textDecoration: "none",
          }}
        >
          Adicionar imagem
          <IconButton aria-label="Criar">
            <AddIcon
              sx={{
                fontSize: "25pt",
                color: "#C7212F",
              }}
            />
          </IconButton>
        </Typography>
        <Divider sx={{ marginTop: "8px", marginBottom: "30px" }} />

        <ImageList variant="masonry" cols={2} gap={15}>
          {images.map((image) => (
            <ImageListItem key={image._id}>
              <IconButton
                onClick={(e) => deleteImage(e, image._id)}
                aria-label="Criar"
                sx={{
                  position: "absolute",
                  float: "right",
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: "25px",
                    background: "#C7212F",
                    color: "#ffff",
                    borderRadius: "15px",
                  }}
                />
              </IconButton>
              <img
                src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image.url}?w=164&fit=crop&auto=format&dpr=2 2x`}
                alt={image.description}
                loading="lazy"
              ></img>
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </Container>
  );
}
