import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link,  useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import Logo from '../../../assets/images/logo.svg';
import LogoutIcon from '@mui/icons-material/Logout';

function ControlNavBar() {
  const navigate = useNavigate();

  const handleLogOut = (event: React.MouseEvent<HTMLElement>) => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
      <AppBar elevation={0} position="static" sx={{ backgroundColor: '#ffff' }}>
        <Toolbar>
            <img className="menu-toggler" src={Logo} alt='logo'/>
            <Typography
              component={Link}
              style={{textDecoration: 'none'}}
              to={`/control`}
              sx={{
                flexGrow: 1,
                color: '#C7212F',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                letterSpacing: '0.1px',
                fontSize: '22px',
                marginLeft: '8px',
                lineHeight: '39px'
              }}
            >
              Leitores da Alegria
            </Typography>
          <Tooltip title={<Typography fontSize={'12px'}>Sair</Typography>}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleLogOut}>
              <LogoutIcon sx={{ fontSize: '22px', color: '#C7212F' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ControlNavBar;
