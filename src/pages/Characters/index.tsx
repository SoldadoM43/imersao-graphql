import { useLazyQuery } from '@apollo/client';
import { Button, CircularProgress, Container, Dialog, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ViewError from '../../components/ViewError';
import { IFilter } from '../../utils/types';
import { GET_CHARACTER, GET_CHARACTERS_FILTER } from './query';

import { ContentBox, ModalDetails } from './styles';
import { IGetCharacter, IGetCharactersList, IGetCharacterFilter } from './types';

const Characters: React.FC = () => {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    handleCharactersList("")
  }, [])

  const handleCharactersList = (textFilter: string, page = 1) => {
    getCharacters({variables: { filter: { name: textFilter }, page } })
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [
    getCharacters, {loading, error, data}
  ] = useLazyQuery<IGetCharactersList, IFilter>(GET_CHARACTERS_FILTER)
  
  const [
    getCharacter, {loading: loadingChar, error: errorChar, data: dataChar}
  ] = useLazyQuery<IGetCharacter, IGetCharacterFilter>(GET_CHARACTER)
  
  return <Container maxWidth="lg">
    <Typography variant='h2'>Personagens</Typography>
    <div style={{ display:'flex' }}>
      <div style={{display: 'flex', flexDirection: 'row', paddingRight: 12, flex:1, alignItems:"center", marginBottom: 16}}>
        <TextField
          fullWidth
          label="Filtrar por nome"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{marginTop: 8, marginLeft: 8}}
          onClick={() => handleCharactersList(text)}
        >
          Filtrar
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          disabled={!data?.characters.info.prev}
          onClick={() => handleCharactersList(text, data?.characters.info.prev)}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!data?.characters.info.next}
          onClick={() => handleCharactersList(text, data?.characters.info.next)}
        >
          Próximo
        </Button>
      </div>
    </div>
    <Grid container>
      {loading && <CircularProgress/> }

      {error && <ViewError>{error.message}</ViewError>}

      {data?.characters.results.map(item => (
        <Grid item xs={12} sm={6} md={4} style={{padding: 8}}>
        <ContentBox onClick={() => {
          getCharacter({variables: {characterId: item.id}});
          setOpen(true)
        }}>
          <img alt={item.name} src={item.image}/>
          <div>
            <Typography variant='h4'>{item.name}</Typography>
            <Typography variant='h6'>Status: {item.status}</Typography>
          </div>
        </ContentBox>
      </Grid>
      ))}
    </Grid>
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <ModalDetails>
        {loadingChar ?? <CircularProgress/>}  

        {errorChar && <ViewError>{errorChar.message}</ViewError>}
        
        {dataChar && (
          <>
            <img alt={dataChar.character.name} src={dataChar.character.image}/>
            <Typography variant='h4'>{dataChar.character.name}</Typography>
            <br/>
            <div>
              <Typography variant='h6'>Status: {dataChar.character.status}</Typography>
              <Typography variant='h6'>Gênero: {dataChar.character.gender}</Typography>
              <Typography variant='h6'>Espécie: {dataChar.character.species}</Typography>
              <Typography variant='h6'>Tipo: {dataChar.character.type}</Typography>
            </div>
            <br/>
            <div>
              <Typography variant='h5'>Origem</Typography>
              <Typography variant='h6'>Nome: {dataChar.character.origin.name}</Typography>
              <Typography variant='h6'>Tipo: {dataChar.character.origin.type}</Typography>
              <Typography variant='h6'>Dimensão: {dataChar.character.origin.dimension}</Typography>
            </div>
          </>
        )}
      </ModalDetails>
    </Dialog>
  </Container>
}

export default Characters;