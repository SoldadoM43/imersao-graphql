import { useLazyQuery } from '@apollo/client';
import { Button, CircularProgress, Container, Dialog, DialogContent, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import ViewError from '../../components/ViewError';
import { IFilter } from '../../utils/types';

import {GET_EPISODE, GET_EPISODES_FILTER} from './query'
import { IGetEpisodes, IGetEpisode, IGetEpisodeFilter } from './types'

const Episodes: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  useEffect(() => {
    handleGetEpisodes("")
  }, [])

  const handleGetEpisodes = (textFilter: string, page = 1) => {
    getEpisodesFilter({variables: { filter: { name: textFilter }, page}})
  }

  const [
    getEpisodesFilter, { loading, error, data }
  ] = useLazyQuery<IGetEpisodes, IFilter>(GET_EPISODES_FILTER)

  const [
    getEpisode, { loading: loadingEpisode, error: errorEpisode, data: dataEpisode }
  ] = useLazyQuery<IGetEpisode, IGetEpisodeFilter>(GET_EPISODE)

    const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const viewBody = () => {
    return <>
    {loading ? <CircularProgress/> :
      data && data.episodes.results.map(item => (
        <Grid item xs={12} sm={4} md={3} style={{padding: 16}}>
        <Paper style={{padding: 8}}>
          <Typography variant='h5'>{item.name}</Typography>
          <Button onClick={() => {
            handleClickOpen()
            getEpisode({variables: {episodeId: item.id}})
          }}>
            Ver mais
          </Button>
        </Paper>
      </Grid>
      ))}
    </>
  }

  return <>   
    <Container maxWidth="lg">
    <Typography variant='h2'>Episódios</Typography>
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
          onClick={() => handleGetEpisodes(text)}
        >
          Filtrar
        </Button>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          disabled={!data?.episodes.info.prev}
          onClick={() => handleGetEpisodes(text, data?.episodes.info.prev)}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!data?.episodes.info.next}
          onClick={() => handleGetEpisodes(text, data?.episodes.info.next)}
        >
          Próximo
        </Button>
      </div>
    </div>
    <Grid container>
      {data && viewBody()}
      {error && <ViewError>{error.message}</ViewError>}
    </Grid>   
    </Container>
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogContent>
        {errorEpisode && <ViewError>{errorEpisode.message}</ViewError>}

        {loadingEpisode && <CircularProgress/> }

        {dataEpisode && (
          <>
            <Typography variant='h3'>{dataEpisode?.episode.name}</Typography>
            <br/>
            <Typography variant='h4'>Episódio:{dataEpisode?.episode.episode}</Typography>
            <Typography variant='h5'>Data: {dataEpisode?.episode.air_date}</Typography>
            <Typography variant='h5'>Criado em: {dataEpisode?.episode.created}</Typography>
          </>
        )}        
      </DialogContent>
    </Dialog>
  </>
}

export default Episodes;