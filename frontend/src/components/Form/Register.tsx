import { Container, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import NavBar from '../common/navBar/NavBar'
import PrimaryTitle from '../common/text/PrimaryTitle'
import SecondaryTitle from '../common/text/SecondaryTitle'

function Register() {
  const [subscriptionUrl, setSubscriptionUrl] = useState("");

  useEffect(() => {
    api.get('/forms')
        .then(response => {
            const subscriptionUrlData = response.data.forms[0].subscription;
            setSubscriptionUrl(subscriptionUrlData);                
        });
  }, [])

  return (
    <Container sx={{paddingBottom: '30px'}}>
      <NavBar/>
      <Container  sx={{marginTop: '30px'}}>
        <PrimaryTitle text="Seja um leitor"/>
        <SecondaryTitle text='No link abaixo você encontrará todas as informações necessárias para se tornar um leitor da alegria:'/>
        <Link href={subscriptionUrl} sx={{fontSize:'18px'}}>Clique aqui para se tornar um Leitor da Alegria ! </Link>
        
      </Container>
    </Container>
  )
}

export default Register