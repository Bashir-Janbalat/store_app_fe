export interface Translations {
    nav: {
        home: string;
        products: string;
        about: string;
        contact: string;
        profile: string;
        account: string;
        logout: string;
        wishlist: string;
        orders: string;
        settings: string;
        login: string;
        signup: string;
    };
    auth: {
        signIn: string;
        signUp: string;
        signOut: string;
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        forgotPassword: string;
        resetPassword: string;
        sendResetEmail: string;
        backToLogin: string;
        createAccount: string;
        alreadyHaveAccount: string;
        dontHaveAccount: string;
        enterEmail: string;
        enterPassword: string;
        enterConfirmPassword: string;
        resetPasswordTitle: string;
        resetPasswordDescription: string;
        checkEmailTitle: string;
        checkEmailDescription: string;
        welcomeBack: string;
        createAccountDescription: string;
        resetNewPasswordDescription: string;
        passwordsDoNotMatch: string;
        passwordResetSuccess: string;
        newPassword: string;
        resetPasswordButton: string;
    };
    footer: {
        description: string;
        quickLinks: string;
        customerService: string;
        contactInfo: string;
        copyright: string;
        links: {
            faq: string;
            returnPolicy: string;
            terms: string;
            privacy: string;
            shipping: string;
        },
        contact: {
            phone: string;
            email: string;
            address: string;
        }
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
            wishlist: 'قائمة الأمنيات',
            orders: 'طلباتي',
            settings: 'الإعدادات',
            login: 'تسجيل الدخول',
            signup: 'إنشاء حساب',
        },
        auth: {
            signIn: 'تسجيل الدخول',
            signUp: 'إنشاء حساب',
            signOut: 'تسجيل الخروج',
            email: 'البريد الإلكتروني',
            name: 'أسم ألمستخدم',
            password: 'كلمة المرور',
            confirmPassword: 'تأكيد كلمة المرور',
            forgotPassword: 'نسيت كلمة المرور؟',
            resetPassword: 'إعادة تعيين كلمة المرور',
            sendResetEmail: 'إرسال رابط الإعادة',
            backToLogin: 'العودة لتسجيل الدخول',
            createAccount: 'إنشاء حساب جديد',
            alreadyHaveAccount: 'لديك حساب بالفعل؟',
            dontHaveAccount: 'ليس لديك حساب؟',
            enterEmail: 'أدخل بريدك الإلكتروني',
            enterPassword: 'أدخل كلمة المرور',
            enterConfirmPassword: 'أعد إدخال كلمة المرور',
            resetPasswordTitle: 'إعادة تعيين كلمة المرور',
            resetPasswordDescription: 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور',
            checkEmailTitle: 'تحقق من بريدك الإلكتروني',
            checkEmailDescription: 'لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني',
            welcomeBack: 'مرحباً بعودتك',
            createAccountDescription: 'إنشاء حساب جديد للاستمتاع بالتسوق',
            resetNewPasswordDescription: 'الرجاء إدخال كلمة المرور الجديدة أدناه',
            passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
            passwordResetSuccess: 'تمت إعادة تعيين كلمة المرور بنجاح',
            newPassword: 'كلمة المرور الجديدة',
            resetPasswordButton: ' إعادة تعيين كلمة المرور',
        },
        footer: {
            description: 'متجرنا الإلكتروني - وجهتك المفضلة للتسوق الإلكتروني',
            quickLinks: 'روابط سريعة',
            customerService: 'خدمة العملاء',
            contactInfo: 'معلومات التواصل',
            copyright: '© 2025 متجرنا الألكتروني. جميع الحقوق محفوظة.',
            links: {
                faq: 'الأسئلة الشائعة',
                returnPolicy: 'سياسة الإرجاع',
                terms: 'الشروط والأحكام',
                privacy: 'سياسة الخصوصية',
                shipping: 'الشحن والتوصيل',
            },
            contact: {
                phone: '+49 165 789 789',
                email: 'info@store.com',
                address: 'برلين، ألمانيا',
            }
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
            wishlist: 'Wishlist',
            orders: 'My Orders',
            settings: 'Settings',
            login: 'Login',
            signup: 'Sign Up',
        },
        auth: {
            signIn: 'Sign In',
            signUp: 'Sign Up',
            signOut: 'Sign Out',
            name: 'Username',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            forgotPassword: 'Forgot Password?',
            resetPassword: 'Reset Password',
            sendResetEmail: 'Send Reset Link',
            backToLogin: 'Back to Login',
            createAccount: 'Create Account',
            alreadyHaveAccount: 'Already have an account?',
            dontHaveAccount: "Don't have an account?",
            enterEmail: 'Enter your email',
            enterPassword: 'Enter your password',
            enterConfirmPassword: 'Confirm your password',
            resetPasswordTitle: 'Reset Password',
            resetPasswordDescription: 'Enter your email and we will send you a link to reset your password',
            checkEmailTitle: 'Check Your Email',
            checkEmailDescription: 'We have sent a password reset link to your email address',
            welcomeBack: 'Welcome Back',
            createAccountDescription: 'Create a new account to start shopping',
            resetNewPasswordDescription: 'Please enter your new password below',
            passwordsDoNotMatch: 'Passwords do not match',
            passwordResetSuccess: 'Password has been reset successfully',
            newPassword: 'New Password',
            resetPasswordButton: 'Confirm Password',
        },
        footer: {
            description: 'Our e-store - your favorite e-shopping destination',
            quickLinks: 'Quick Links',
            customerService: 'Customer Service',
            contactInfo: 'Contact Info',
            copyright: '© 2025 Our e-store. All rights reserved.',
            links: {
                faq: 'FAQ',
                returnPolicy: 'Return Policy',
                terms: 'Terms & Conditions',
                privacy: 'Privacy Policy',
                shipping: 'Shipping & Delivery',
            },
            contact: {
                phone: '+49 165 789 789',
                email: 'info@store.com',
                address: 'برلين، ألمانيا',
            }
        },
        common: {
            storeName: 'Our Online Store',
        },
    },
};
