import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IAppBarProps } from '../../interfaces';

export default function TopAppBar(props: IAppBarProps) {
  const { toggleTheme, mode } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ padding: '0.5rem 4rem', boxShadow: '1px 1px 4px -1px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', padding: '0 !important'}}>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1, fontSize: '1.5rem' }}>
            <b>Where in the World?</b>
          </Typography>
          <Button 
            color="inherit" sx={{ textTransform: 'none' }}
            onClick={toggleTheme}
          >
            { mode === 'light' ? <DarkModeIcon sx={{ marginRight: '0.25rem'}}/> : <LightModeIcon sx={{ marginRight: '0.25rem'}}/> }
            { mode === 'light' ? 'Dark Mode' : 'Light Mode'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
