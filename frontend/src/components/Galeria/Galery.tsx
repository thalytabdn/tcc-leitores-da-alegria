import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Container } from "@mui/material";
import NavBar from "../common/navBar/NavBar";
import PrimaryTitle from "../common/text/PrimaryTitle";
import Subtitle from "../common/text/Subtitle";
import api from "../../services/api";

interface IImage {
  _id: string;
  url: string;
  description: string;
}

export default function Galery() {
  const [images, setImages] = React.useState<IImage[]>([]);

  React.useEffect(() => {
    api.get('/images').then((response) => {
      const imagesData = response.data.images;
      setImages(imagesData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: "30px" }}>
      <NavBar />
      <Container sx={{ marginTop: "30px" }}>
        <PrimaryTitle text="Galeria" />
        <Subtitle text="Confira abaixo a beleza do nosso trabalho:" />

        <Box>
        <ImageList variant="masonry" cols={2} gap={8}>

            {images.map((image) => (
              <ImageListItem key={image._id}>
                <img
                  src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${image.url}?w=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.description}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Container>
    </Container>
  );
}

