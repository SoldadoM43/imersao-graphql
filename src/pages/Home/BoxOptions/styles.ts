import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Container = styled(Paper).attrs({square: true, elevation: 3})`
  div {
      padding: 12px;
  }
`;
