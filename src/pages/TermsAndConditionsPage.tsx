import React from 'react';
import {useLanguage} from "../hooks/useLanguage.ts";

const TermsAndConditionsPage: React.FC = () => {
    const {t} = useLanguage();
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t.footer.links.terms}</h1>
            <p>{t.footer.description} - Terms and conditions content goes here...</p>
        </div>
    );
};

export default TermsAndConditionsPage;