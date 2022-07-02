import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { blueGrey, deepOrange } from '@mui/material/colors';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import {
  enrollUserInCourseByCourseId,
  getCourseById,
  getStudentsByCourseId,
} from '../../api/ApiCalls';
import CourseView from '../../components/Courses/CourseView';
import TicketCard from '../../components/CustomCard/TicketCard';
import CustomCardProfile from '../../components/CustomCard/CustomCardProfile';

const CourseDetails = () => {
  const courseId = useParams().courseId;
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const [course, setCourse] = useState({});
  const [courseStudents, setCourseStudents] = useState([]);
  const [courseFaculty, setCourseFaculty] = useState();

  const loadCourse = async () => {
    try {
      const res = await getCourseById(courseId);
      setCourse(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadCourseStudent = async () => {
    try {
      const res = await getStudentsByCourseId(courseId);
      let students = [];
      let faculty = {};
      res?.data?.forEach((student) => {
        if (student.accessLevel == 'STUDENT') {
          students.push(student);
        } else if (student.accessLevel == 'FACULTY') {
          faculty = student;
        }
      });
      setCourseStudents(students);
      setCourseFaculty(faculty);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function loadCourseStudentFunc() {
      await loadCourseStudent();
    }
    async function loadCourseFunc() {
      await loadCourse();
    }
    loadCourseStudentFunc();
    loadCourseFunc();
  }, []);

  const handleEnrollment = async () => {
    try {
      console.log('enrolling', userId);
      const body = {
        studentId: userId,
      };
      const res = await enrollUserInCourseByCourseId(courseId, body);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container>
      <Helmet>
        <title>Course Details</title>
      </Helmet>
      <Grid item xs={12} md={12} lg={12}>
        <Card>
          <CardContent>
            <Stack direction={'row'} spacing={2}>
              <Grid item xs={12} md={6} lg={6}>
                <CourseView course={course} />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Stack direction={'column'} spacing={2}>
                  <TicketCard
                    title={'Number of Students'}
                    subtitle={`${courseStudents?.length}`}
                    avatar={
                      <GroupsOutlinedIcon
                        sx={{ color: blueGrey[100] }}
                      />
                    }
                    type={'icon'}
                    avStyles={{ bgcolor: blueGrey[500] }}
                  />
                  <TicketCard
                    title={'Faculty Has Been Enrolled'}
                    subtitle={courseFaculty?.username ? 'Yes' : 'No'}
                    avatar={
                      <SchoolOutlinedIcon
                        sx={{ color: deepOrange[100] }}
                      />
                    }
                    type={'icon'}
                    avStyles={{ bgcolor: deepOrange[500] }}
                  />
                  <Button
                    variant="outlined"
                    color={'primary'}
                    onClick={async () => await handleEnrollment()}
                  >
                    <Typography variant={'h5'}>
                      {'Enroll In This Course'}
                    </Typography>
                  </Button>
                </Stack>
              </Grid>
            </Stack>
          </CardContent>
          {courseStudents?.length > 0 && (
            <CardContent>
              <Typography variant={'h5'}>
                {'Students Enrolled in The Course'}
              </Typography>
              <Stack flexDirection={'row'} flex={true}>
                {courseStudents.map((student) => {
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
          )}
          {courseFaculty && (
            <CardContent>
              <Typography variant={'h5'}>{'Faculty'}</Typography>
              <Grid item xs={12} md={4} lg={4}>
                <CustomCardProfile user={courseFaculty} />
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

export default CourseDetails;
