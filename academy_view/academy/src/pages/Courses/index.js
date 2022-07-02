import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllCourses } from '../../api/ApiCalls';
import CourseView from '../../components/Courses/CourseView';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    try {
      const res = await getAllCourses();
      setCourses(res?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function loadCoursesFunc() {
      await loadCourses();
    }
    loadCoursesFunc();
  }, []);

  return (
    <>
      <Grid item md={6} xs={12} lg={6}>
        <Typography variant="h4">{'List of Courses'}</Typography>
      </Grid>
      <Grid
        container
        direction={'row'}
        spacing={2}
        alignItems={'strech'}
        justifyContent={'flex-start'}
        paddingTop={'32px'}
      >
        {courses?.map((course) => {
          return (
            <Grid
              item
              key={course?.id}
              xs={12}
              md={4}
              lg={4}
              xl={4}
              sm={6}
            >
              <CourseView course={course} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Courses;
