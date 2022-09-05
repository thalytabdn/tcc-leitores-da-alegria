import React, { useEffect, useState } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import api from '../../../services/api';
import ControlNavBar from '../../common/navBar/ControlNavBar';
import PrimaryTitle from '../../common/text/PrimaryTitle';
import MemberItem from './MemberItem';

interface IMember {
  _id: string;
  name: string;
  description: string;
  image: string;
}

function ListMember() {
  const [members, setMembers] = useState<IMember[]>([]);

  useEffect(() => {
    api.get('/members').then((response) => {
      const membersData = response.data.members;
      setMembers(membersData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Membros" />

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
          Adicionar novo membro
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

      {members.map((member) => {
        return (
          <MemberItem
            edit
            id={member._id}
            key={member._id}
            name={member.name}
            description={member.description}
            image={member.image}
          />
        );
      })}
    </Container>
  );
}

export default ListMember;
