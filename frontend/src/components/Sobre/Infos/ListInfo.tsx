import React, { useEffect, useState } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import api from '../../../services/api';
import ControlNavBar from '../../common/navBar/ControlNavBar';
import PrimaryTitle from '../../common/text/PrimaryTitle';
import InfoItem from './InfoItem';

interface IInfo {
  _id: string;
  title: string;
  text: string;
}

function ListInfo() {
  const [infos, setInfos] = useState<IInfo[]>([]);

  useEffect(() => {
    api.get('/infos').then((response) => {
      const infosData = response.data.infos;
      setInfos(infosData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Informações" />

        <Typography
          component={Link}
          to={`create`}
          sx={{
            whiteSpaces: 'nowrap',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#000',
            textDecoration: 'none'
          }}
        >
          Adicionar nova informação
          <IconButton aria-label="Criar">
            <AddIcon
              sx={{
                fontSize: '25pt',
                color: '#C7212F'
              }}
            />
          </IconButton>
        </Typography>
      </Container>

      <Divider sx={{ marginTop: '8px', marginBottom: '30px' }} />

      {infos.map((info) => {
        return (
          <InfoItem
            edit
            id={info._id}
            key={info._id}
            title={info.title}
            text={info.text}
          />
        );
      })}
    </Container>
  );
}

export default ListInfo;
