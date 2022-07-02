import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import TicketCard from '../../components/CustomCard/TicketCard';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import {
  deepOrange,
  deepPurple,
  blueGrey,
} from '@mui/material/colors';
import Courses from '../Courses';
import { useState } from 'react';

const Home = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  return (
    <Grid container>
      <Helmet>
        <title>Academy</title>
      </Helmet>
      <Grid item xs={12} md={12} lg={12}>
        <Stack direction={'row'} spacing={2}>
          <Grid item xs={4} md={4} lg={4}>
            <TicketCard
              title={'Notification'}
              subtitle={`12`}
              avatar={
                <NotificationsActiveTwoToneIcon
                  sx={{ color: deepOrange[100] }}
                />
              }
              type={'icon'}
              avStyles={{ bgcolor: deepOrange[500] }}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <TicketCard
              title={'Events'}
              subtitle={`6`}
              avatar={
                <CalendarMonthOutlinedIcon
                  sx={{ color: deepPurple[100] }}
                />
              }
              type={'icon'}
              avStyles={{ bgcolor: deepPurple[500] }}
            />
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <TicketCard
              title={'Attendance'}
              subtitle={`94%`}
              avatar={
                <PercentOutlinedIcon sx={{ color: blueGrey[100] }} />
              }
              type={'icon'}
              avStyles={{ bgcolor: blueGrey[500] }}
            />
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ paddingTop: '16px' }}>
        <Card>
          <CardContent>
            <Grid item xs={12} md={12} lg={12}>
              <CardContent>
                <Typography variant="h4" color={'#2B2D42'}>
                  {'Welcome ' + user.username}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Courses />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
