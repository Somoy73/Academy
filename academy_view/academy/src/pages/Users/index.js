import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  getAllStudents,
  getUsersByAccessLevel,
} from '../../api/ApiCalls';
import CustomCardProfile from '../../components/CustomCard/CustomCardProfile';

const Users = () => {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const getStudents = async () => {
    try {
      const res = await getAllStudents();
      setStudents(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getFaculties = async () => {
    try {
      const res = await getUsersByAccessLevel('FACULTY');
      setFaculties(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getData() {
      await getStudents();
      await getFaculties();
    }
    getData();
  }, []);

  return (
    <Grid container>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Grid item xs={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Typography variant="h4">{'Students'}</Typography>
            <Stack direction={'row'}>
              {students.map((student) => {
                return (
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    xl={4}
                    padding={2}
                    key={student.id}
                  >
                    <CustomCardProfile user={student} />
                  </Grid>
                );
              })}
            </Stack>
          </CardContent>
          <CardContent>
            <Typography variant="h4">{'Faculties'}</Typography>
            <Stack direction={'row'}>
              {faculties.map((faculty) => {
                return (
                  <Grid
                    item
                    lg={4}
                    md={4}
                    sm={6}
                    xs={12}
                    xl={4}
                    padding={2}
                    key={faculty.id}
                  >
                    <CustomCardProfile user={faculty} />
                  </Grid>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Users;
