import * as React from 'react';
import { Container, Grid, Paper } from '@mui/material';
import Chart from '../Chart/Chart';
import Deposits from '../Deposits/Deposits';
import MyRecentTrainings from '../Training/MyRecentTrainings';

const Dashboard = () => {
  return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Chart />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Deposits />
            </Paper>
          </Grid>
          {/* Recent MyRecentTrainings */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <MyRecentTrainings />
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Dashboard
