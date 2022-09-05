import { TextField } from '@mui/material'
import React from 'react'

interface PrimaryTextFieldProps {
  text: string;
  value?: string;
  disabled?:boolean;
  sx?: Array<any> | any;
  [x: string]: any;
}

function PrimaryTextField({ id, label, disabled, value, name, type, onChange, sx, ...props }: PrimaryTextFieldProps) {
  return (
    <TextField 
    onChange={onChange}
    disabled={disabled}
    value={value}
    fullWidth 
    type={type}  
    id={id} 
    label={label} 
    InputProps={{ style: { fontSize: 14 } }}
    InputLabelProps={{ style: { fontSize: 14 }, shrink: true }}
    variant="outlined" sx={[
      {
        background: 'transparent',
        marginBottom: '12px',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}/>
  );
}

PrimaryTextField.defaultProps = { sx: {} };
export default PrimaryTextField;
