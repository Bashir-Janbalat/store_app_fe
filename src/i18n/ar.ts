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
        cart: 'السلة',
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
        phone: "رقم الهاتف",
        phoneInvalid: "رقم الهاتف غير صالح",
        errorOccurredSendingRequest: "حدث خطأ أثناء إرسال الطلب.",
        updatedSuccessfully: "تم تحديث الملف الشخصي بنجاح",
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
        inStock: "المتوفر في المستودع",
        outOfStock: "غير متوفر حاليآ",
        lowStock: "كمية محدودة",
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
        yes: "نعم",
        no: "لا",
        loading: "جاري الحفظ...",
        errorOccurred: "حدث خطأ، حاول مرة أخرى",
        currency: " ل.س "
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
        inStock: "متوفر فقط",
    },
    cart: {
        title: "سلة المشتريات",
        items: "عناصر السلة",
        emptyCart: "سلة المشتريات فارغة",
        emptyCartDescription: "لا يوجد أي منتجات في السلة بعد.",
        quantity: "الكمية",
        remove: "إزالة",
        total: "الإجمالي",
        clearCart: "تفريغ السلة",
        checkout: "المتابعة إلى الدفع",
        noCartIdError: "لا يمكن إتمام الطلب بدون معرف السلة.",
        outOfStockMessage: "لقد وصلت إلى الحد الأقصى للمخزون!",
        add: {
            success: "تمت الإضافة إلى السلة",
            error: "فشل في الإضافة إلى السلة",
            updated: "العنصر موجود مسبقًا، تم تحديث الكمية"
        },
        update: {
            success: "تم تحديث الكمية",
            error: "فشل في تحديث الكمية"
        },
        removed: {
            success: "تمت إزالة العنصر من السلة",
            error: "فشل في إزالة العنصر"
        },
        clear: {
            success: "تم إفراغ السلة",
            error: "فشل في إفراغ السلة"
        }
    },
    wishlist: {
        title: "قائمة الأمنيات",
        emptyWishlist: "قائمة الأمنيات فارعة ",
        emptyWishlistDescription: "لا يوجد أي منتجات في السلة بعد.",
        remove: "إزالة",
        clearWishlist: "تفريغ قائمة الأمنيات",
        added : "تمت الإضافة إلى قائمة الرغبات",
        addError: "فشل في الإضافة إلى قائمة الرغبات",
        removed : "تم إزالة العنصر من قائمة الرغبات",
        removeError : "فشل في إزالة العنصر",
        cleared : "تم مسح قائمة الرغبات",
        clearError : "فشل في مسح قائمة الرغبات"
    },
    address: {
        title: 'العناوين الخاصة بك',
        edit: 'تعديل العنوان',
        editSuccess: 'تم تعديل العنوان بنجاح',
        editError: 'حدث خطأ أثناء تعديل العنوان: ',
        create: "إضافة عنوان جديد",
        createBillingAddress: "إنشاء عنوان فوترة",
        createShippingAddress: "إنشاء عنوان شحن",
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
        mustSetDefault: "يرجى تعيين عناوين الفوترة والشحن الافتراضية.",
        type: {
            title: 'نوع العنوان',
            billing: "عنوان الفاتورة",
            shipping: "عنوان الشحن",
            defaultSetSuccess: "تم تعيين العنوان كافتراضي بنجاح",
            defaultSetError: "فشل في تعيين العنوان كافتراضي: ",
            setAsDefaultBilling: "تعيين كعنوان فوترة افتراضي",
            setAsDefaultShipping: "تعيين كعنوان شحن افتراضي",
        }
    },
    checkout: {
        title: "الدفع",
        checkout: "المتابعة للدفع",
        processingOrder: "جاري معالجة الطلب...",
        wantInvoice: "هل تريد إنشاء فاتورة؟"
    },
    payment: {
        title: "طرق الدفع المتاحة",
        description: "يمكنك الدفع باستخدام البطاقات الائتمانية (Visa، MasterCard)، أو عبر PayPal، Google Pay، Apple Pay، وغيرها من الطرق.",
        successTitle: "تمت العملية بنجاح",
        successMessage: "شكرًا لك! تم الدفع بنجاح.",
        successWithSession: "شكرًا لك! تم الدفع بنجاح. رقم الجلسة: {{sessionId}}",
        cancelTitle: "تم إلغاء الدفع",
        cancelMessage: "لم تكتمل عملية الدفع. يرجى المحاولة مرة أخرى.",
        cancelSuccess: "تم إلغاء الطلب بنجاح",
        cancelError: "فشل إلغاء الطلب",
        invalidLink: "الرابط غير صالح",
        sessionCreationFailed: "فشل إنشاء جلسة الدفع"
    },
    ordersList: {
        title: "قائمة الطلبات",
        noOrders: "لا توجد طلبات متاحة",
        statusLabel: "حالة الطلب"
    },
    orderCard: {
        orderNumber: "طلب رقم #",
        products: "المنتجات:",
        quantityPrice: "الكمية: ",
        total: "المجموع الكلي ",
        reviewProduct: "قيّم المنتج",
    },
    orderStatus: {
        PENDING: "قيد الانتظار",
        PROCESSING: "جارٍ المعالجة",
        SHIPPED: "تم الشحن",
        DELIVERED: "تم التوصيل",
        CANCELLED: "تم الإلغاء"
    },
    productReview: {
        writeReview: "اكتب تقييم",
        thankYou: "شكرًا على تقييمك!",
        yourRating: "تقييمك",
        yourComment: "تعليقك",
        submitReview: "إرسال التقييم",
        noReviewsYet: "لا توجد تقييمات لهذا المنتج بعد.",
        userReviews: "تقييمات المستخدمين",
        showMore: "رؤية المزيد..",
    }

}
