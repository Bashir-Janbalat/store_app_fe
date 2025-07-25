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
        cart: string;
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
        phone: string;
        phoneInvalid: string;
        errorOccurredSendingRequest: string;
        updatedSuccessfully: string,
        emailNotVerified: string;
        invalidCredentials: string;
        authServiceUnavailable: string;
        invalidEmail: string,
        invalidPassword: string,
        userAlreadyExists: string,
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
        inStock: string,
        outOfStock: string,
        lowStock: string,
    };
    featuredProducts: {
        title: string;
    };
    common: {
        searchPlaceholder: string;
        storeName: string;
        delete: string;
        edit: string;
        save: string;
        cancel: string;
        goHome: string;
        backToCart: string;
        yes: string;
        no: string;
        loading: string;
        errorOccurred: string;
        currency: string;
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
        inStock: string,
    };
    cart: {
        title: string;
        "items": string;
        emptyCart: string;
        emptyCartDescription: string;
        quantity: string;
        remove: string;
        total: string;
        clearCart: string;
        checkout: string;
        noCartIdError: string;
        outOfStockMessage: string;
        add: {
            success: string,
            error: string,
            updated: string,
        },
        update: {
            success: string,
            error: string
        },
        removed: {
            success: string,
            error: string
        },
        clear: {
            success: string,
            error: string
        },
    },
    wishlist: {
        title: string;
        emptyWishlist: string;
        emptyWishlistDescription: string;
        remove: string;
        clearWishlist: string;
        added: string,
        addError: string,
        removed: string,
        removeError: string,
        cleared: string,
        clearError: string
    },
    address: {
        title: string;
        edit: string;
        editSuccess: string;
        editError: string;
        create: string;
        createBillingAddress: string;
        createShippingAddress: string;
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
        mustSetDefault: string;
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
    checkout: {
        title: string;
        checkout: string;
        processingOrder: string;
        "wantInvoice": string;
    },
    payment: {
        title: string;
        description: string;
        successTitle: string,
        successMessage: string,
        successWithSession: string,
        cancelTitle: string,
        cancelMessage: string,
        cancelSuccess: string,
        cancelError: string,
        invalidLink: string,
        sessionCreationFailed: string,
    },
    "ordersList": {
        title: string,
        noOrders: string,
        statusLabel: string,
    },
    orderCard: {
        orderNumber: string,
        products: string,
        quantityPrice: string,
        total: string,
        reviewProduct: string;
    },
    orderStatus: {
        PENDING: string,
        PROCESSING: string,
        SHIPPED: string,
        DELIVERED: string,
        CANCELLED: string
    },
    productReview: {
        writeReview: string,
        thankYou: string,
        yourRating: string,
        yourComment: string,
        submitReview: string,
        noReviewsYet: string;
        userReviews: string;
        showMore: string;
    }
}
