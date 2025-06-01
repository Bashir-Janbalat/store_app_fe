import React, {type ReactNode, useEffect, useState} from "react";
import {LanguageContext} from "./LanguageContext";
import {translations} from "../../i18n/translations";
import {CacheProvider} from "@emotion/react";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import {cacheLtr, cacheRtl} from "../../theme/emotionCache";
import {createAppTheme} from "../../theme";

type Language = 'ar' | 'en';

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({children}) => {
    const [language, setLanguage] = useState<Language>('ar');

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
    };

    const isRTL = language === 'ar';
    const t = translations[language];
    const theme = createAppTheme(isRTL);

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }, [isRTL]);

    return (
        <LanguageContext.Provider value={{language, toggleLanguage, t, isRTL}}>
            <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    {children}
                </ThemeProvider>
            </CacheProvider>
        </LanguageContext.Provider>
    );
};
