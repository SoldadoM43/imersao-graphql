import { Typography } from '@material-ui/core';
import React from 'react';
import { IBoxOptions } from '../types';

import { Container } from './styles';

const BoxOptions: React.FC<{item: IBoxOptions}> = ({item}) => {
    console.log('BoxOptions',item)
  return <Container>
      <img src={item.image} style={{width: "100%", height: 156, objectFit: "cover"}} alt={item.title}/>
      <div>
        <Typography variant='h4' style={{fontWeight: 'bold'}}>{item.title}</Typography>
        <Typography variant='h6'>Qtd.: {item.count}</Typography>
      </div>
  </Container>
}

export default BoxOptions;