import {createTheme} from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {main: '#0d47a1'}, // deep blue
        secondary: {main: '#ff6f00'}, // orange accent
    },
    shape: {borderRadius: 16},
    components: {
        MuiButton: {styleOverrides: {root: {textTransform: 'none', borderRadius: 12}}},
        MuiCard: {styleOverrides: {root: {borderRadius: 16}}},
    },
    typography: {
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif',
        h1: {fontWeight: 800},
        h2: {fontWeight: 800},
    },
})
