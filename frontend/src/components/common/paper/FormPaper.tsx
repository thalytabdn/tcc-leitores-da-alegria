import React from 'react';
import { Typography, Paper } from '@mui/material';
import theme from '../../../utils/theme';

interface FormTitleProps {
  title: string;
}

function FormTitle({ title }: FormTitleProps) {
  return (
    <div style={{ backgroundColor: theme.palette.secondary.main, borderRadius: '8px 8px 0px 0px' }}>
      <Typography
        variant='h5'
        sx={{
          color: theme.palette.secondary.contrastText,
          padding: 2,
          fontSize: '18px',
          marginBottom:  '30px',
          fontWeight: 'normal',
          textAlign: 'left',
        }}>
        {title}
      </Typography>
    </div>
  );
}

interface FormPaperProps {
  bigPaper?: boolean;
  children: Array<React.ReactNode>;
  className?: string;
  mediumPaper?: boolean;
  sx?: Array<any> | any;
  title: string;
}

const defaultProps = {
  bigPaper: false,
  className: '',
  mediumPaper: false,
  sx: [],
};

function FormPaper({ title, mediumPaper, bigPaper, sx, ...props }: FormPaperProps) {
  return (
    <Paper
      elevation={2}
      {...props}
      sx={{
        margin: 'auto',
        borderRadius: '8px',
        maxWidth: '768px',
        marginBottom: '30px',
        minHeight: '320px',
        ...(Array.isArray(sx) ? sx : [sx]),
        mt: 0,
      }}
      color='secondary'>
      <FormTitle title={title} />

      {props.children ? props.children : null}
    </Paper>
  );
}

FormPaper.defaultProps = defaultProps;
export default FormPaper;
