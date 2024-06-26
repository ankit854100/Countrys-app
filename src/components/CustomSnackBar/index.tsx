import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { ISnackBarProps } from '../../interfaces';

export default function CustomSnackBar(props: ISnackBarProps) {
  const [open, setOpen] = React.useState(true);
  const { message, buttonText, backNavigation } = props;
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Grid sx={{ width: '100%' }}>
      {
        buttonText && 
        <Button color="primary" size="small" onClick={backNavigation}>
          Back
        </Button>
      }
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Grid>
  );

  return (
    <Snackbar
      open={open}
      // autoHideDuration={10000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
}