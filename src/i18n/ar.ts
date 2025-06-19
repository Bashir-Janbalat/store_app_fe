import type {Translations} from "./types.ts";

export const ar: Translations = {
    nav: {
        home: 'الرئيسية',
        products: 'المنتجات',
        about: 'معلومات عنا',
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
    features: {
        title: 'لماذا تختارنا؟',
        variety: {
            title: 'تشكيلة واسعة',
            description: 'آلاف المنتجات في جميع الفئات',
        },
        shipping: {
            title: 'توصيل سريع',
            description: 'توصيل مجاني للطلبات فوق 100 دولار',
        },
        payment: {
            title: 'دفع آمن',
            description: 'طرق دفع متنوعة وآمنة',
        },
        support: {
            title: 'دعم 24/7',
            description: 'فريق دعم متاح طوال الوقت',
        },
    },
    hero: {
        title: 'مرحباً بك في متجرنا الإلكتروني',
        subtitle: 'اكتشف أفضل المنتجات بأسعار رائعة',
        cta: 'تسوق الآن',
    },
    auth: {
        signIn: 'تسجيل الدخول',
        signUp: 'إنشاء حساب',
        signOut: 'تسجيل الخروج',
        name: 'أسم ألمستخدم',
        email: 'البريد الإلكتروني',
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
        pages: {
            faq: {
                title: "الأسئلة الشائعة",
                description: "اكتشف إجابات للأسئلة المتكررة حول منتجاتنا وخدماتنا."
            },
            returnPolicy: {
                title: "سياسة الإرجاع",
                description: "تعرف على سياسة الإرجاع والاسترداد قبل إجراء عملية الشراء."
            },
            terms: {
                title: "الشروط والأحكام",
                description: "يرجى قراءة الشروط والأحكام الخاصة بنا بعناية قبل استخدام الموقع."
            },
            privacy: {
                title: "سياسة الخصوصية",
                description: "نحن نحترم خصوصيتك. تعرف على كيفية تعاملنا مع بياناتك الشخصية."
            },
            shipping: {
                title: "الشحن والتوصيل",
                description: "معلومات عن عمليات الشحن، أوقات التوصيل، والتكاليف."
            }
        },
        contact: {
            phone: '+49 165 789 789',
            email: 'info@store.com',
            address: 'برلين، ألمانيا',
        }
    },
    categories: {
        title: 'تسوق حسب الفئة',
    },
    brands: {
        title: 'تسوق حسب العلامة التجارية',
    },
    product: {
        title: 'المنتجات',
        category: "الفئة",
        unknownCategory: "غير محددة",
        brand: "الماركة",
        unknownBrand: "غير محددة",
        supplier: "المورد",
        details: "تفاصيل المنتج",
        similarProducts: 'منتجات مشابهة',
        price: "السعر",
        addToCart: "أضف إلى السلة",
        addToWishlist: "أضف إلى الأمنيات",
        removeFromWishlist: "إزالة من الأمنيات",
    },
    featuredProducts: {
        title: 'المنتجات المميزة',
    },
    common: {
        storeName: 'متجرنا الإلكتروني',
        searchPlaceholder: 'ابحث عن منتج...',
        edit: "تعديل",
        delete: "حذف",
        save: 'حفظ',
        cancel: 'إلغاء',
        goHome: "العودة إلى الصفحة الرئيسية",
        backToCart: "العودة إلى السلة",
    },
    error: {
        message: "حدث خطأ ما.",
        retry: "حاول مجددًا",
        imageAlt: "صورة خطأ الورشة المعطلة",
        retryFail: "حدث خطأ أثناء إعادة المحاولة."
    },
    loading: {
        message: "جاري تحميل البيانات...",
        retry: "جارٍ إعادة المحاولة..."
    },
    success: {
        loaded: "تم تحميل البيانات بنجاح."
    },
    filter: {
        title: "الفلاتر",
        price: "السعر",
        applyFilters: "تطبيق الفلاتر",
        reset: "إعادة تعيين",
    },
    cart: {
        title: "سلة المشتريات",
        emptyCart: "سلة المشتريات فارغة",
        emptyCartDescription: "لا يوجد أي منتجات في السلة بعد.",
        quantity: "الكمية",
        remove: "إزالة",
        total: "الإجمالي",
        clearCart: "تفريغ السلة",
        checkout: "الدفع",
        noCartIdError: "لا يمكن إتمام الطلب بدون معرف السلة."
    },
    wishlist: {
        title: "قائمة الأمنيات",
        emptyWishlist: "قائمة الأمنيات فارعة ",
        emptyWishlistDescription: "لا يوجد أي منتجات في السلة بعد.",
        remove: "إزالة",
        clearWishlist: "تفريغ قائمة الأمنيات",
    },
    address: {
        title: 'العناوين الخاصة بك',
        edit: 'تعديل العنوان',
        editSuccess: 'تم تعديل العنوان بنجاح',
        editError: 'حدث خطأ أثناء تعديل العنوان: ',
        create: "إضافة عنوان جديد",
        createSuccess: "تم إضافة العنوان بنجاح",
        createError: "حدث خطأ أثناء إضافة العنوان: ",
        default: "افتراضي",
        deleteSuccess: "تم حذف العنوان بنجاح",
        deleteError: "حدث خطأ أثناء حذف العنوان: ",
        addressLine: 'العنوان',
        city: 'المدينة',
        state: 'الولاية',
        postalCode: 'الرمز البريدي',
        country: 'البلد',
        noFormData: 'لا توجد بيانات في النموذج',
        fillAllRequiredFields: 'يرجى ملء جميع الحقول المطلوبة',
        type: {
            title:'نوع العنوان',
            billing: "عنوان الفاتورة",
            shipping: "عنوان الشحن",
            defaultSetSuccess: "تم تعيين العنوان كافتراضي بنجاح",
            defaultSetError: "فشل في تعيين العنوان كافتراضي: ",
            setAsDefaultBilling: "تعيين كعنوان فوترة افتراضي",
            setAsDefaultShipping: "تعيين كعنوان شحن افتراضي",
        }
    },
    payment: {
        successTitle: "تمت العملية بنجاح",
        successMessage: "شكرًا لك! تم الدفع بنجاح.",
        successWithSession: "شكرًا لك! تم الدفع بنجاح. رقم الجلسة: {{sessionId}}",
        cancelTitle: "تم إلغاء الدفع",
        cancelMessage: "لم تكتمل عملية الدفع. يرجى المحاولة مرة أخرى.",
        cancelSuccess: "تم إلغاء الطلب بنجاح",
        cancelError: "فشل إلغاء الطلب",
        invalidLink: "الرابط غير صالح",
        sessionCreationFailed: "فشل إنشاء جلسة الدفع"
    }
}
