import { Box } from "@mui/material";
import React from "react";
import SecondaryTitle from "../../common/text/SecondaryTitle";
import Subtitle from "../../common/text/Subtitle";

interface MemberProps {
  id?: string;
  title: string;
  text: string;
  edit?: boolean;
}

function MemberItem({ id, title, edit, text, ...props }: MemberProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "auto",
        marginBottom: "30px",
        marginLeft: "24px",
      }}
    >
      <Box sx={{ width: "70%" }}>
        <SecondaryTitle text={title} id={id} edit={edit} />

        <Subtitle sx={{ marginBottom: "13px" }} text={text} />
      </Box>
    </Box>
  );
}

export default MemberItem;
