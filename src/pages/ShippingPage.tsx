import React from 'react';
import {useLanguage} from "../hooks/useLanguage.ts";

const ShippingPage: React.FC = () => {
    const {t} = useLanguage();
    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t.footer.links.shipping}</h1>
            <p>{t.footer.description} - Shipping and delivery content goes here...</p>
        </div>
    );
};

export default ShippingPage;