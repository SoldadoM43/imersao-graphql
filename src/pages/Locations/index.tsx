import { useLazyQuery } from '@apollo/client';
import { Button, CircularProgress, Container, Dialog, DialogContent, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { GET_LOCATION, GET_LOCATIONS_FILTER } from './query';
import { IFilterGetLocation, IGetLocation, IGetLocations } from './types';

const Locations: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  useEffect(()=> {
    handleLocationFilter("")
  },[])

  const handleLocationFilter = (textFilter: string) => {
    getLocationsFilter({variables: { filter: { name: textFilter }}})
  }

  const [getLocationsFilter, 
  {
    loading,
    error,
    data
  }] = useLazyQuery<IGetLocations,IFilterGetLocation>(GET_LOCATIONS_FILTER)

  const [
    getLocation,
    {
      loading: locationLoading,
      error: locationError,
      data: locationData
    }
  ] = useLazyQuery<IGetLocation>(GET_LOCATION);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return <>   
    <Container maxWidth="md">
    <Typography variant='h2'>Locais</Typography>
    <Grid container style={{flexDirection: 'column', marginBottom: 16}}>
      <TextField
        label="Filtrar por nome"
        fullWidth
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button
        color="primary"
        style={{marginTop: 8}}
        onClick={() => handleLocationFilter(text)}
      >
        Filtrar
      </Button>
    </Grid>
    <Grid container>
      {loading ? <CircularProgress/> :
      data && data.locations.results.map(item => (
        <Grid item xs={12} sm={6} md={4} style={{padding: 16}}>
        <Paper style={{padding: 8}}>
          <Typography variant='h4'>{item.name}</Typography>
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
        <Typography variant='h4'>{locationData?.location.name}</Typography>
        <Typography variant='h5'>{locationData?.location.type}</Typography>
        <Typography variant='h5'>{locationData?.location.dimension}</Typography>
      </DialogContent>
    </Dialog>
  </>
}

export default Locations;