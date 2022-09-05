import React from 'react';
import theme from '../../../utils/theme';

function FormPaperActions({ children }: { children: Array<React.ReactNode> }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: `${theme.spacing(6)}`,
        paddingRight: `${theme.spacing(6)}`,
        paddingTop: `${theme.spacing(2)}`,
        paddingBottom: `${theme.spacing(4)}`,
        gap: `${theme.spacing(2)}`,
      }}>
      {children}
    </div>
  );
}

export default FormPaperActions;
