import { Typography } from '@mui/material'
import React from 'react'

interface SubtitleProps {
  text: string;
  sx?: Array<any> | any;
  [x: string]: any;
}

function Subtitle({ text, sx, ...props }: SubtitleProps) {
  return (
    <Typography
      variant='h5'
      sx={{
        fontWeight: 'normal',
        textAlign: 'left',
        marginBottom: '8px',
        ...(Array.isArray(sx) ? sx : [sx]),
      }}>
      {text}
    </Typography>
  );
}

Subtitle.defaultProps = { sx: {} };
export default Subtitle;
