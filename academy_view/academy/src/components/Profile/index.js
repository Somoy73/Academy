import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getUserByUserId } from '../../api/ApiCalls';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
        <Card sx={{ minWidth: '192px' }}>
          <CardContent>
            <Grid item xs={12} md={12} lg={12}>
              <Card sx={{ ':hover': { boxShadow: 20 } }}>
                <CardMedia
                  component="img"
                  alt={user?.username}
                  image={
                    'https://www.w3schools.com/w3css/img_avatar.png'
                  }
                />
                <CardContent>
                  <Typography variant="h4" color={'#2B2D42'}>
                    {user?.username}
                  </Typography>
                  <Typography variant="h5" color={'#2B2D42'}>
                    {user?.email}
                  </Typography>
                  <Typography variant="h5" color={'#2B2D42'}>
                    {user?.address}
                  </Typography>
                  <Typography variant="h5" color={'#2B2D42'}>
                    {user?.accessLevel}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Profile;
