import * as React from 'react';
import { ThemeProvider, THEME_ID, createTheme } from '@mui/material/styles';

const appTheme = createTheme({});

export default function AppThemeProvider({children}) {
    return (
        <ThemeProvider theme={{[THEME_ID]: appTheme}}>
            {children}
        </ThemeProvider>
    )
}