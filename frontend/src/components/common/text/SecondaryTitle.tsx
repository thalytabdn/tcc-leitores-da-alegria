import { IconButton, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

interface SecondaryTitleProps {
  text: string;
  edit?: boolean;
  id?: string;
  sx?: Array<any> | any;
  [x: string]: any;
}

const defaultProps = {
  sx: {}
};

function SecondaryTitle({ edit, text, id, sx, ...props }: SecondaryTitleProps) {
  const itemId = id ? id : '';

  return (
    <Typography
      sx={{
        fontWeight: '600',
        fontSize: '25px',
        marginBottom: '15px',
        textAlign: 'left',
        ...(Array.isArray(sx) ? sx : [sx])
      }}
      {...props}
    >
      {text}

      <Link to={`edit/${itemId}`}>
        <IconButton
          aria-label="Editar"
          sx={{
            display: edit ? '' : 'none'
          }}
        >
          <EditIcon
            fontSize="large"
            sx={{
              color: '#C7212F'
            }}
          />
        </IconButton>
      </Link>
    </Typography>
  );
}

SecondaryTitle.defaultProps = defaultProps;

export default SecondaryTitle;
