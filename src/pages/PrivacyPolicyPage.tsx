import React from 'react';
import {useLanguage} from "../hooks/useLanguage.ts";

const PrivacyPolicyPage: React.FC = () => {
    const {t} = useLanguage();
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t.footer.links.privacy}</h1>
            <p>{t.footer.description} - Privacy policy content goes here...</p>
        </div>
    );
};

export default PrivacyPolicyPage;