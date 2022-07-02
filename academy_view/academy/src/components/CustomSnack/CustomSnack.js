import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    // '& > * + *': {
    // 	marginTop: theme.spacing(2)
    // }
  },
}));
const CustomSnackbar = (props) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.setOpen(false);
  };
  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={props.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={props.severity}
        >
          {props.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
