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
        },
        pages: {
            faq: {
                title: string,
                description: string
            },
            returnPolicy: {
                title: string,
                description: string
            },
            terms: {
                title: string,
                description: string
            },
            privacy: {
                title: string,
                description: string
            },
            shipping: {
                title: string,
                description: string
            }
        }
        contact: {
            phone: string;
            email: string;
            address: string;
        }
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
        supplier: string,
        details: string;
        similarProducts: string,
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
        delete: string;
        edit: string;
        save: string,
        cancel: string,
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
    cart: {
        title: string;
        emptyCart: string;
        emptyCartDescription: string;
        quantity: string;
        remove: string;
        total: string;
        clearCart: string;
    },
    wishlist: {
        title: string;
        emptyWishlist: string;
        emptyWishlistDescription: string;
        remove: string;
        clearWishlist: string;
    },
    address: {
        title: string;
        edit: string;
        editSuccess: string;
        editError: string;
        create: string;
        createSuccess: string,
        createError: string,
        default: string,
        deleteSuccess: string,
        deleteError: string,
        addressLine: string,
        city: string,
        state: string,
        postalCode: string,
        country: string,
        noFormData: string;
        fillAllRequiredFields: string;
        type: {
            title: string,
            billing: string,
            shipping: string,
            defaultSetSuccess: string;
            defaultSetError: string;
            setAsDefaultBilling: string;
            setAsDefaultShipping: string;
        }
    },
}
