import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function ThemeRegistry({children}: { children: React.ReactNode }) {

    return (
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
    )
}
