import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseView = (props) => {
  const { course } = props;
  const navigate = useNavigate();
  return (
    <Card sx={{ height: 1, ':hover': { boxShadow: 20 } }}>
      <CardMedia
        component="img"
        height={'194'}
        image={
          course?.imageUrl
            ? course.imageUrl
            : 'https://via.placeholder.com/192'
        }
        alt={course?.name}
      />
      <CardHeader title={course?.name} />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {course?.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/courses/' + course?.id)}
        >
          View Course
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseView;
