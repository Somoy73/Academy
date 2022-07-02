import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  styled,
  Typography,
  Collapse,
} from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomCardProfile = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  const IMAGES = {
    ADMIN: 'https://www.w3schools.com/w3css/img_avatar.png',
    STUDENT:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fw3images%2Favatar5.png&f=1&nofb=1',
    FACULTY:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.w3schools.com%2Fhowto%2Fimg_avatar2.png&f=1&nofb=1',
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ ':hover': { boxShadow: 20 } }}>
      <CardMedia
        component="img"
        height={'194'}
        image={user?.image ? user?.image : IMAGES[user?.accessLevel]}
        alt={user?.username}
      />
      <CardHeader title={user?.username} sx={{ height: '10vh' }} />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {'ID: '} {user?.id}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {'Email: '}
          {user?.email}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {'Address: '}
          {user?.address}
        </Typography>
      </CardContent>
      {loggedInUser?.accessLevel == 'ADMIN' ? (
        <>
          <CardActions disableSpacing>
            <IconButton
              aria-label="View User Profile"
              onClick={() => window.open('https://www.google.com/')}
            >
              <VisibilityIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={() => handleExpandClick()}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" color={'text.secondary'}>
                <br />
                {'Age of the User: '}
                {user?.age}
              </Typography>
            </CardContent>
          </Collapse>
        </>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default CustomCardProfile;
