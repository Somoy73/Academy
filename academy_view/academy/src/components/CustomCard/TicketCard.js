import React from 'react';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Row, Item } from '@mui-treasury/components/flex';
import {
  Info,
  InfoTitle,
  InfoSubtitle,
} from '@mui-treasury/components/info';
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { Card, CardContent } from '@mui/material';

const useStyles = makeStyles(() => ({
  action: {
    backgroundColor: '#000000',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#000',
    },
  },
}));

const TicketCard = React.memo(function TicketCardF(props) {
  const { avatar, type, avStyles, title, subtitle, icon } = props;
  const defaultAvatar =
    'https://www.biography.com/.image/t_share/MTU0ODUwMjQ0NjIwNzI0MDAx/chris-hemsworth-poses-during-a-photo-call-for-thor-ragnarok-on-october-15-2017-in-sydney-australia-photo-by-mark-metcalfe_getty-images-for-disney-square.jpg';
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });
  const avatarStyles = useDynamicAvatarStyles({
    radius: 12,
    size: 48,
  });
  return (
    <Card sx={{ borderRadius: '8px', ':hover': { boxShadow: 15 } }}>
      <CardContent>
        <Row p={1.5} gap={2} bgcolor={'#f5f5f5'} borderRadius={16}>
          <Item>
            {type === 'icon' ? (
              <Avatar sx={avStyles}>{avatar}</Avatar>
            ) : (
              <Avatar
                classes={avatarStyles}
                src={avatar ? avatar : defaultAvatar}
                sx={avStyles}
              />
            )}
          </Item>
          <Info position={'middle'} useStyles={useTutorInfoStyles}>
            <InfoTitle>{title ? title : 'Kenny Foster'}</InfoTitle>
            <InfoSubtitle>
              {subtitle ? subtitle : 'Kenny Foster'}
            </InfoSubtitle>
          </Info>
          <Item ml={1} position={'middle'}>
            {icon && (
              <IconButton
                className={styles.action}
                classes={iconBtnStyles}
              >
                {icon}
              </IconButton>
            )}
          </Item>
        </Row>
      </CardContent>
    </Card>
  );
});

export default TicketCard;
