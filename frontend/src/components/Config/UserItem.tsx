import { Box } from "@mui/material";
import React from "react";
import SecondaryTitle from "../common/text/SecondaryTitle";
import Subtitle from "../common/text/Subtitle";

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: number;
  edit: boolean;
}

function UserItem({
  id,
  name,
  email,
  edit,
  password,
  role,
  ...props
}: UserProps) {
  
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        minWidth: "auto",
        justifyContent: "space-around",
        marginBottom: "30px",
      }}
    >
      <Box sx={{ width: "70%" }}>
        <SecondaryTitle text={name} id={id} edit={edit} />

        <Subtitle sx={{ marginBottom: "13px" }} text={password} />
      </Box>
    </Box>
  );
}

export default UserItem;
