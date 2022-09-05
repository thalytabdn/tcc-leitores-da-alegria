import { Container, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import NavBar from '../common/navBar/NavBar'
import PrimaryTitle from '../common/text/PrimaryTitle'
import SecondaryTitle from '../common/text/SecondaryTitle'

function Contract() {
  const [contractUrl, setContractUrl] = useState("");

  useEffect(() => {
    api.get('/forms')
        .then(response => {
            const contractUrlData = response.data.forms[0].contract;
            setContractUrl(contractUrlData);                
        });
  }, [])

  return (
    <Container sx={{paddingBottom: '30px'}}>
      <NavBar/>
      <Container  sx={{marginTop: '30px'}}>
        <PrimaryTitle text="Contrate um leitor"/>
        <SecondaryTitle text='No link abaixo você encontrará todas as informações necessárias para contratar um leitor da alegria:'/>
        <Link href={contractUrl} sx={{fontSize:'18px'}}>Clique aqui para contratar um Leitor da Alegria ! </Link>
      </Container>
    </Container>
  )
}

export default Contract