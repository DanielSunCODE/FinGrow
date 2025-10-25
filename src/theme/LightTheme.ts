import {createTheme} from '@mui/material/styles';
import type {Theme} from "@mui/material";

export const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#004AAD',
            light: '#004AAD33',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#00C49A',
            light: '#00C49A33',
            contrastText: '#FFFFFF',
        },
        tertiary: {
            main: '#FFC107',
            light: '#FFC10733',
            contrastText: '#101c22',
        },

        error: {
            main: '#F44336',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#FF9800',
            contrastText: '#FFFFFF',
        },
        info: {
            main: '#2196F3',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#4CAF50',
            contrastText: '#FFFFFF',
        },

        background: {
            default: '#FFFFFF',
            paper: '#F8F9FA',
        },

        text: {
            primary: '#101c22',
            secondary: '#6c757d',
            disabled: 'rgba(16, 28, 34, 0.5)',
        },

        divider: 'rgba(16, 28, 34, 0.12)',
    },
});
