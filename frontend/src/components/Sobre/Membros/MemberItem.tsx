import { Box } from '@mui/material'
import React from 'react'

import Avatar from '@mui/material/Avatar';
import SecondaryTitle from '../../common/text/SecondaryTitle';
import Subtitle from '../../common/text/Subtitle';

interface MemberProps {
  id?: string;
  name: string;
  description: string;
  edit?: boolean;
  image: string;
}

function MemberItem({id, name, image, edit, description, ...props }: MemberProps) {

  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 'auto', justifyContent: 'space-around', marginBottom: '30px' }}>
      <Box>
          <Avatar
            alt={name}
            src={image}
            sx={{ width: 150, height: 150, marginBottom: '20px' }}
          />
      </Box>

      <Box sx={{width:'70%'}}>
        <SecondaryTitle text={name} id={id} edit={edit}/>
        
        <Subtitle sx={{marginBottom: '13px'}} text={description}/>

      </Box>

      

    </Box>
  )
}

export default MemberItem