import React from "react";
import { Container } from "@mui/material";
import PrimaryTitle from "../common/text/PrimaryTitle";

import Divider from "@mui/material/Divider";
import ControlNavBar from "../common/navBar/ControlNavBar";
import SecondaryTitle from "../common/text/SecondaryTitle";

function ListForm() {
  return (
    <Container sx={{ paddingBottom: "30px" }}>
      <ControlNavBar />

      <Container sx={{ marginTop: "30px" }}>
        <PrimaryTitle text="Formulários" />

        <Divider sx={{ marginTop: "8px", marginBottom: "30px" }} />

        <SecondaryTitle
          edit={true}
          id="contract"
          text="Formulário contratante"
        />

        <SecondaryTitle
          edit={true}
          id="subscription"
          text="Formulário inscrição"
        />
      </Container>
    </Container>
  );
}

export default ListForm;
