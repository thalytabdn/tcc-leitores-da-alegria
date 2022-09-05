import React from 'react';
import { Button } from '@mui/material';

interface PrimaryProgressProps {
  sx?: Array<any> | any;
  [x: string]: any;
}

const defaultProps = {
  sx: {},
};

function SecondaryButton({ sx, ...props }: PrimaryProgressProps) {
  return (
    <Button
      {...props}
      variant='outlined'
      sx={[
        {
          mt: 3,
          mb: 2, 
          fontSize: '14px',
          color: '#fff',
          background:'#C7212F',
          '&.MuiButton-root:hover': {
            background:'#C7212F'
          },
          height: '40px',
          minWidth: '95px',
          '&:last-child': {
            marginRight: 0,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      color='secondary'
    />
  );
}

SecondaryButton.defaultProps = defaultProps;

export default SecondaryButton;
