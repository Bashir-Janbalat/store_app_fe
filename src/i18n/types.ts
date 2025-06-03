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
    features: {
        title: string;
        variety: {
            title: string;
            description: string;
        };
        shipping: {
            title: string;
            description: string;
        };
        payment: {
            title: string;
            description: string;
        };
        support: {
            title: string;
            description: string;
        };
    };
    hero: {
        title: string;
        subtitle: string;
        cta: string;
    }
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
        };
        contact: {
            phone: string;
            email: string;
            address: string;
        };
    };
    categories: {
        title: string;
    };
    brands: {
        title: string;
    };
    product: {
        title: string;
        category: string,
        unknownCategory: string,
        brand: string,
        unknownBrand: string,
        price: string,
        addToCart: string,
        addToWishlist: string,
        removeFromWishlist: string,
    };
    featuredProducts: {
        title: string;
    };
    common: {
        searchPlaceholder: string;
        storeName: string;
    };
    error: {
        message: string;
        retry: string;
        imageAlt: string;
        retryFail: string
    };
    loading: {
        message: string;
        retry: string;
    }
    success: {
        loaded: string;
    };
    filter: {
        title: string,
        price: string,
        applyFilters: string,
        reset: string,
    };
}
