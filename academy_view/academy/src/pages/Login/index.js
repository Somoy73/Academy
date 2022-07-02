import {
  Card,
  CardActions,
  TextField,
  Grid,
  Button,
  Typography,
  Box,
  CardContent,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { login } from '../../api/ApiCalls';
import CustomSnackbar from '../../components/CustomSnack/CustomSnack';
import { validUser } from '../../utils/Authentication/ValidUser';

const Login = (props) => {
  const { user, setUser } = props;
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState({
    severity: 'info',
    message: '',
  });

  const handleClick = async () => {
    const body = {
      username: username,
      password: password,
    };
    try {
      console.log('body', body);
      const res = await login(body);
      console.log(res);
      if (validUser(res?.data)) {
        setUser({
          ...user,
          ...res?.data,
        });
        console.log('login successful');
        setOpen(true);
        setSnack({
          severity: 'success',
          message: 'Login successful',
        });
      } else {
        setOpen(true);
        setSnack({
          severity: 'error',
          message: 'Login failed',
        });
      }
      console.log(res?.data);
    } catch (e) {
      console.log('login failed: ', e);
      setOpen(true);
      setSnack({
        severity: 'error',
        message: 'Login Failed',
      });
    }
  };
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      padding={'32px'}
      style={{ minHeight: '100vh', minWidth: '100vw' }}
    >
      <Helmet>
        <title>Academy Login</title>
      </Helmet>
      <Grid item xs={12} md={12} lg={12}>
        <Card sx={{ align: 'center', width: '100%' }}>
          <CardContent>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" color={'primary'}>
                {'Academy'}
              </Typography>
              <Typography variant="h4" paddingTop={'32px'}>
                {'Sign in'}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Stack direction={'column'} spacing={4}>
              <Grid item>
                <TextField
                  placeholder={'Please Enter Your Username'}
                  label={'Username'}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{ paddinTop: '16px' }}
              >
                <TextField
                  placeholder={'Please Enter your Password'}
                  label={'Password'}
                  onChange={(e) => setPassword(e.target.value)}
                  type={'password'}
                />
              </Grid>
              <Grid item xs={4} md={4} lg={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => await handleClick()}
                >
                  Login
                </Button>
              </Grid>
            </Stack>
          </CardActions>
        </Card>
      </Grid>
      <CustomSnackbar
        open={open}
        setOpen={setOpen}
        severity={snack.severity}
        message={snack.message}
      />
    </Grid>
  );
};

export default Login;
