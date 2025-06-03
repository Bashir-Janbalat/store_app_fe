import type {Translations} from "./types.ts";


export const en: Translations = {
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
        login: 'LoginPage',
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
        contact: {
            phone: '+49 165 789 789',
            email: 'info@store.com',
            address: 'Berlin, Germany',
        }
    },
    categories: {
        title: 'Shop by Category',
    },
    product: {
        title: 'Products',
        category: "Category",
        unknownCategory: "Unspecified",
        brand: "Brand",
        unknownBrand: "Unspecified",
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
}

