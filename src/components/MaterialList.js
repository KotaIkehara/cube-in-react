import React from 'react';
import {Box,List, ListItem,ListItemText, Divider, Typography} from '@mui/material';

const MaterialList = (props) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, border:1, bgcolor: 'background.paper' }} className='info'>
      <List>
      {props.title.length !==0 &&
      <>
      <Typography gutterBottom variant="h4" component="div">
        {props.title}
      </Typography>
      <Divider variant="middle" />
      </>
      }
      {props.details.length===0 ? 
      <ListItem>
          <ListItemText primary="Please Click Object" />
        </ListItem>
      :
      props.details.map((item)=>(
        <ListItem key={item.name}>
          <ListItemText primary={item.name +" x "+ item.num } />
        </ListItem>
      )) 
      }
      </List>
  </Box>
  )
}

export default MaterialList