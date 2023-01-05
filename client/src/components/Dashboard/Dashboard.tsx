import * as React from 'react';
import {Container, Grid} from '@mui/material';
import MyRecentTrainings from '../Training/MyRecentTrainings';

const Dashboard = () => {
  return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <MyRecentTrainings />
          </Grid>
        </Grid>
      </Container>
  );
}

export default Dashboard
