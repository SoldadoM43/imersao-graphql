import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import background from '../../assets/background.jpg'

export const Container = styled.div`
  position: relative;
  height: 90vh;
  display: flex;
  align-items: flex-start;
  padding: 24px;
  background-image: url(${background});
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
`;

export const Content = styled(Grid).attrs({container: true})``;

export const Box = styled(Grid).attrs({item: true, sm: 6, xs: 12})<{first?: boolean}>`
    display: flex;
    align-items: center;
    justify-content: ${props => props.first ? "flex-start" : "flex-end"};
`;

export const Logo = styled.img`
    width: 480px;
    height: 140px;
    object-fit: contain;    
`;

export const Details = styled(Grid).attrs({container: true})`
    padding-top: 32px;
`;

export const BoxDetails = styled(Grid).attrs({item: true, xs: 12, sm: 6, md: 4})`
    padding: 16px;
`;