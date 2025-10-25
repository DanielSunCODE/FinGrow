import {createTheme} from '@mui/material/styles';
import type {Theme} from "@mui/material";

export const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#4A90E2',
            light: '#4A90E244',
            contrastText: '#F8F9FA',
        },
        secondary: {
            main: '#26C6A4',
            light: '#26C6A444',
            contrastText: '#F8F9FA',
        },
        tertiary: {
            main: '#FFD54F',
            light: '#FFD54F44',
            contrastText: '#101c22',
        },

        error: {
            main: '#FF6B6B',
            contrastText: '#F8F9FA',
        },
        warning: {
            main: '#FFB74D',
            contrastText: '#101c22',
        },
        info: {
            main: '#64B5F6',
            contrastText: '#101c22',
        },
        success: {
            main: '#81C784',
            contrastText: '#101c22',
        },

        background: {
            default: '#101c22',
            paper: '#1e2329',
        },

        text: {
            primary: '#F8F9FA',
            secondary: '#adb5bd',
            disabled: 'rgba(248, 249, 250, 0.5)',
        },

        divider: 'rgba(248, 249, 250, 0.12)',
    },
});