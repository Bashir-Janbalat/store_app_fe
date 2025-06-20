import type {Translations} from "./types.ts";


export const en: Translations = {
    nav: {
        home: 'Home',
        products: 'Products',
        about: 'About us',
        contact: 'Contact',
        profile: 'Profile',
        account: 'My Account',
        logout: 'Logout',
        wishlist: 'Wishlist',
        orders: 'My Orders',
        settings: 'Settings',
        login: 'Sign In',
        signup: 'Sign Up',
    },
    features: {
        title: 'Why Choose Us?',
        variety: {
            title: 'Wide Variety',
            description: 'Thousands of products in all categories',
        },
        shipping: {
            title: 'Fast Delivery',
            description: 'Free shipping on orders over 100 €',
        },
        payment: {
            title: 'Secure Payment',
            description: 'Multiple safe payment methods',
        },
        support: {
            title: '24/7 Support',
            description: 'Support team available around the clock',
        },
    },
    hero: {
        title: 'Welcome to Our Online Store',
        subtitle: 'Discover the best products at amazing prices',
        cta: 'Shop Now',
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
        backToLogin: 'Back to LoginPage',
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
        pages: {
            faq: {
                title: "Frequently Asked Questions",
                description: "Find answers to common questions about our products and services."
            },
            returnPolicy: {
                title: "Return Policy",
                description: "Read our return and refund policies before making a purchase."
            },
            terms: {
                title: "Terms and Conditions",
                description: "Please read our terms and conditions carefully before using our website."
            },
            privacy: {
                title: "Privacy Policy",
                description: "We value your privacy. Learn how we handle your data."
            },
            shipping: {
                title: "Shipping & Delivery",
                description: "Information about our shipping process, delivery times, and costs."
            }
        },
        contact: {
            phone: '+49 165 789 789',
            email: 'info@store.com',
            address: 'Berlin, Germany',
        }
    },
    categories: {
        title: 'Shop by Category',
    },
    brands: {
        title: 'Shop by Brand',
    },
    product: {
        title: 'Products',
        category: "Category",
        unknownCategory: "Unspecified",
        brand: "Brand",
        unknownBrand: "Unspecified",
        supplier: "Supplier",
        details: "Details",
        similarProducts: 'Similar Products',
        price: "Price",
        addToCart: "Add to Cart",
        addToWishlist: "Add to Wishlist",
        removeFromWishlist: "Remove from Wishlist",
    },
    featuredProducts: {
        title: 'Featured Products',
    },
    common: {
        storeName: 'Our Online Store',
        searchPlaceholder: 'Search products...',
        edit: "Edit",
        delete: "Delete",
        save: 'Save',
        cancel: 'Cancel',
        goHome: "Go to Home",
        backToCart: "Back to Cart",
        yes: "Yes",
        no: "No"
    },
    error: {
        message: "Something went wrong.",
        retry: "Retry",
        imageAlt: "Broken workshop error image",
        retryFail: "Error while retrying.",
    },
    loading: {
        message: "Loading data...",
        retry: "Retrying...",
    },
    success: {
        loaded: "Data loaded successfully.",
    },
    filter: {
        title: "Filters",
        price: "Price",
        applyFilters: "Apply Filters",
        reset: "Reset",
    },
    cart: {
        title: "Shopping Cart",
        emptyCart: "Your cart is empty ",
        emptyCartDescription: "You haven't added any items to your cart yet.",
        quantity: "Quantity",
        remove: "Remove",
        total: "Total",
        clearCart: "Clear Cart",
        checkout: "Proceed to Checkout",
        noCartIdError: "Cannot proceed with checkout without a cart ID."
    },
    wishlist: {
        title: "Wishlist items",
        emptyWishlist: "Your Wishlist is empty ",
        emptyWishlistDescription: "You haven't added any items to your Wishlist yet.",
        remove: "Remove",
        clearWishlist: "Clear Wishlist",
    },
    address: {
        title: 'Your Addresses',
        edit: 'Edit Address',
        editSuccess: 'Address updated successfully',
        editError: 'Error updating address: ',
        create: "Add New Address",
        createBillingAddress: "Create Billing Address",
        createShippingAddress: "Create Shipping Address",
        createSuccess: "Address created successfully",
        createError: "Error creating address: ",
        default: "Default",
        deleteSuccess: "Address deleted successfully",
        deleteError: "Error deleting address: ",
        addressLine: 'Address Line',
        city: 'City',
        state: 'State',
        postalCode: 'Postal Code',
        country: 'Country',
        noFormData: "No data in the form",
        fillAllRequiredFields: 'Please fill all required fields',
        mustSetDefault: "Please set default billing and shipping addresses.",
        type: {
            title: 'Address Type',
            billing: "Billing ",
            shipping: "Shipping ",
            defaultSetSuccess: "Default address set successfully",
            defaultSetError: "Failed to set default address: ",
            setAsDefaultBilling: "Set as Default Billing",
            setAsDefaultShipping: "Set as Default Shipping",
        }
    },
    checkout: {
        title: "Checkout",
        checkout: "Proceed to Payment",
        processingOrder: "Processing order...",
        wantInvoice: "Do you want an invoice?"
    },
    payment: {
        title: "Available Payment Methods",
        description: "You can pay using credit cards (Visa, MasterCard), or through PayPal, Google Pay, Apple Pay, and other supported methods.",
        successTitle: "Payment Successful",
        successMessage: "Thank you! Your payment was successful.",
        successWithSession: "Thank you! Your payment was successful. Session ID: {{sessionId}}",
        cancelTitle: "Payment Cancelled",
        cancelMessage: "Your payment was not completed. Please try again.",
        cancelSuccess: "Order cancelled successfully",
        cancelError: "Failed to cancel order",
        invalidLink: "Invalid session link",
        sessionCreationFailed: "Failed to create payment session",
    },
}

