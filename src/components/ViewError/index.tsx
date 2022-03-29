import React from 'react';
import { Typography } from '@material-ui/core';

const ViewError: React.FC = ({children}) => {
  return (
    <div>
      <Typography variant='h3'>{children}</Typography>
    </div>
  );
}

export default ViewError;