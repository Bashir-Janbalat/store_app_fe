import {createContext} from "react";
import type {Translations} from "../../i18n/types.ts";


type Language = 'ar' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: Translations;
    isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
