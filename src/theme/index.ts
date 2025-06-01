import { createTheme } from '@mui/material/styles';

export const createAppTheme = (isRTL: boolean): ReturnType<typeof createTheme> => {
    const font = isRTL ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif';

    return createTheme({
        direction: isRTL ? 'rtl' : 'ltr',
        typography: {
            fontFamily: font,
            h1: { fontFamily: font, fontWeight: 700 },
            h2: { fontFamily: font, fontWeight: 600 },
            h3: { fontFamily: font, fontWeight: 600 },
            h4: { fontFamily: font, fontWeight: 600 },
            h5: { fontFamily: font, fontWeight: 500 },
            h6: { fontFamily: font, fontWeight: 500 },
            body1: { fontFamily: font, fontWeight: 400 },
            body2: { fontFamily: font, fontWeight: 400 },
        },
        palette: {
            primary: { main: '#1976d2' },
            secondary: { main: '#dc004e' },
        },
    });
};