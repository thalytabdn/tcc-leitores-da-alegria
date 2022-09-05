import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavBar from '../common/navBar/NavBar';
import PrimaryTitle from '../common/text/PrimaryTitle';
import api from '../../services/api';
import MemberItem from './Membros/MemberItem';
import Subtitle from '../common/text/Subtitle';

interface Member {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface Info {
  id: string,
  title: string;
  text: string;
}

interface Supporter {
  id: string;
  name: string;
  image: string;
  description: string;
}

function About() {
  const [members, setMembers] = useState<Member[]>([]);
  const [infos, setInfos] = useState<Info[]>([]);
  const [supporters, setSupporters] = useState<Supporter[]>([]);

  useEffect(() => {
    api.get('/members').then((response) => {
      const membersData = response.data.members;
      setMembers(membersData);
    });

    api.get('/supporters').then((response) => {
      const supportersData = response.data.supporters;
      setSupporters(supportersData);
    });

    api.get('/infos').then((response) => {
      const infosData = response.data.infos;
      setInfos(infosData);
    });
  }, []);

  return (
    <Container sx={{ paddingBottom: '30px' }}>
      <NavBar />

      {infos.map((info) => {
        return (
          <Container key={info.id} sx={{ marginTop: '30px' }}>
            <PrimaryTitle text={info.title} />
            <Subtitle
              sx={{ marginBottom: '13px' }}
              text={info.text}
            />
          </Container>
        );
      })}

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Membros" />

        {members.map((member, index) => {
          return <MemberItem key={index} description={member.description} name={member.name} image={member.image} />;
        })}
      </Container>

      <Container sx={{ marginTop: '30px' }}>
        <PrimaryTitle text="Nossos atuais parceiros e seus benefícios" />

        {supporters.map((supporter, index) => {
          return <MemberItem key={index} description={supporter.description} name={supporter.name} image={supporter.image} />;
        })}
      </Container>
    </Container>
  );
}

export default About;
