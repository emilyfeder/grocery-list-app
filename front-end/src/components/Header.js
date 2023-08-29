import {AppBar, Toolbar, Typography} from '@mui/material';
import * as React from 'react';

export function Header() {
    return (
        <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
              My Grocery List
            </Typography>
        </Toolbar>
      </AppBar>
    )
}