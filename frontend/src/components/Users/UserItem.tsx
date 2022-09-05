import React from 'react'
import { Box } from '@mui/material'
import SecondaryTitle from '../common/text/SecondaryTitle';
import Subtitle from '../common/text/Subtitle';


interface UserProps {
  id?: string;
  name: string;
  email: string;
  edit?: boolean;
}

function UserItem({id, edit, name, email, ...props }: UserProps) {
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 'auto', justifyContent: 'flex-start', marginBottom: '30px' }}>
    
      <Box sx={{width:'70%'}}>
        <SecondaryTitle text={name} id={id} edit={edit}/>
        
        <Subtitle sx={{marginBottom: '13px'}} text={email}/>

      </Box>

      

    </Box>
  )
}

export default UserItem