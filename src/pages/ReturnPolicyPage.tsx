import React from 'react';
import {useLanguage} from "../hooks/useLanguage.ts";

const ReturnPolicyPage: React.FC = () => {
    const {t} = useLanguage();
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t.footer.links.returnPolicy}</h1>
            <p>{t.footer.description} - Return policy content goes here...</p>
        </div>
    );
};

export default ReturnPolicyPage;