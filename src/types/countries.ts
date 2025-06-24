import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

export interface Country {
    code: string;
    dialCode: string;
    name: string;
}

const generateCountries = (locale: string): Country[] =>
    getCountries().map(code => ({
        code,
        dialCode: '+' + getCountryCallingCode(code),
        name: new Intl.DisplayNames([locale], { type: 'region' }).of(code) || code,
    }));

export const countries_en = generateCountries('en');
export const countries_ar = generateCountries('ar');
