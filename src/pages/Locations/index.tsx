import { useLazyQuery } from '@apollo/client';
import { Button, CircularProgress, Container, Dialog, DialogContent, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import ViewError from '../../components/ViewError';
import { IFilter } from '../../utils/types';
import { GET_LOCATION, GET_LOCATIONS_FILTER } from './query';
import { IGetLocation, IGetLocations, IGetLocationFilter } from './types';

const Locations: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  useEffect(()=> {
    handleLocationFilter("")
  },[])

  const handleLocationFilter = (textFilter: string, page = 1) => {
    getLocationsFilter({variables: { filter: { name: textFilter }, page}})
  }

  const [
    getLocationsFilter, { loading, error, data }
  ] = useLazyQuery<IGetLocations, IFilter>(GET_LOCATIONS_FILTER)

  const [
    getLocation, { loading: locationLoading, error: locationError, data: locationData }
  ] = useLazyQuery<IGetLocation, IGetLocationFilter>(GET_LOCATION);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>   
    <Container maxWidth="lg">
    <Typography variant='h2'>Locais</Typography>
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
          onClick={() => handleLocationFilter(text)}
        >
          Filtrar
        </Button>
      </div>
      <div>
      <Button
          variant="contained"
          color="primary"
          disabled={!data?.locations.info.prev}
          onClick={() => handleLocationFilter(text, data?.locations.info.prev)}
        >
          Anterior
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!data?.locations.info.next}
          onClick={() => handleLocationFilter(text, data?.locations.info.next)}
        >
          Próximo
        </Button>
      </div>
    </div>
    <Grid container>
      {error && <ViewError>{error.message}</ViewError>}
      
      {loading && <CircularProgress/> }
      
      {data && data.locations.results.map(item => (
        <Grid item xs={12} sm={4} md={3} style={{padding: 16}}>
        <Paper style={{padding: 8}}>
          <Typography variant='h5'>{item.name}</Typography>
          <Button onClick={() => {
            handleClickOpen()
            getLocation({variables: {locationId: item.id}})
          }}>
            Ver mais
          </Button>
        </Paper>
      </Grid>
      ))}
    </Grid>   
    </Container>
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogContent>
        {locationError && <ViewError>{locationError.message}</ViewError> }
        
        {locationLoading && <CircularProgress/> }
        
        {locationData && 
          <>
            <Typography variant='h3'>{locationData.location.name}</Typography>
            <br/>
            <Typography variant='h4'>Dimensão:{locationData.location.dimension}</Typography>
            <Typography variant='h5'>Tipo: {locationData.location.type}</Typography>
          </>
        }
      </DialogContent>
    </Dialog>
  </>
}

export default Locations;