import React from 'react'
import { IconButton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

interface PrimaryTitleProps {
  text: string;
  create?: boolean;
  edit?: boolean;
  handleClick?: any;
  sx?: Array<any> | any;
  [x: string]: any;
}

function PrimaryTitle({ text,edit, handleClick, create, sx, ...props }: PrimaryTitleProps) {
  return (
    <Typography sx={[
      {
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'left',
        fontSize: '25pt',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}>
      
      {text}
      <Tooltip title={<Typography fontSize={'12px'}>Editar</Typography>}> 
        <IconButton
          onClick={handleClick}
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

      </Tooltip>
    </Typography>
  );
}

PrimaryTitle.defaultProps = { sx: {} };
export default PrimaryTitle;
