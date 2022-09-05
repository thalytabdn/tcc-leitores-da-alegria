import React, { useEffect, useState } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import PrimaryTitle from '../common/text/PrimaryTitle';
import api from '../../services/api';
import SupporterItem from './SupporterItem';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ControlNavBar from '../common/navBar/ControlNavBar';

interface ISupporter {
  _id: string;
  name: string;
  description: string;
  image: string;
}

function ListSupporter() {
  const [supporters, setSupporters] = useState<ISupporter[]>([]);

  useEffect(() => {
    api.get('/supporters').then((response) => {
      const supportersData = response.data.supporters;
      setSupporters(supportersData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Parceiros" />

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
          Adicionar novo parceiro
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

      {supporters.map((supporter) => {
        return (
          <SupporterItem
            edit
            id={supporter._id}
            key={supporter._id}
            name={supporter.name}
            description={supporter.description}
            image={supporter.image}
          />
        );
      })}
    </Container>
  );
}

export default ListSupporter;
