import React, { useEffect, useState } from 'react';
import { Container, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';

import UserItem from './UserItem';
import api from '../../services/api';
import ControlNavBar from '../common/navBar/ControlNavBar';
import PrimaryTitle from '../common/text/PrimaryTitle';
import { getField } from '../../utils/localStorageService';

interface IUser {
  _id: string,
  name: string;
  email: string;
  password: string;
}

function ListUser() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api.get('/users').then((response) => {
      const usersData = response.data.users;
      const usersAux = usersData.filter((user: IUser) => user._id !== getField('id'));
      setUsers(usersAux);
    });
  }, []);


  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <ControlNavBar />

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Usuários" />

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
          Adicionar novo usuário
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

      <Container>

        {users.map((user) => {
          return (
            <UserItem
              edit
              id={user._id}
              key={user._id}
              name={user.name}
              email={user.email}
            />
          );
        })}
      </Container>

    </Container>
  );
}

export default ListUser;
