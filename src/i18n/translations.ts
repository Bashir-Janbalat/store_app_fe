export interface Translations {
    nav: {
        home: string;
        products: string;
        about: string;
        contact: string;
        profile: string;
        account: string;
        logout: string;
    };
    common: {
        storeName: string;
    };
}

export const translations: Record<'ar' | 'en', Translations> = {
    ar: {
        nav: {
            home: 'الرئيسية',
            products: 'المنتجات',
            about: 'عنا',
            contact: 'اتصل بنا',
            profile: 'الملف الشخصي',
            account: 'حسابي',
            logout: 'تسجيل الخروج',
        },
        common: {
            storeName: 'متجرنا الإلكتروني',
        },
    },
    en: {
        nav: {
            home: 'Home',
            products: 'Products',
            about: 'About',
            contact: 'Contact',
            profile: 'Profile',
            account: 'My Account',
            logout: 'Logout',
        },
        common: {
            storeName: 'Our Online Store',
        },
    },
};
