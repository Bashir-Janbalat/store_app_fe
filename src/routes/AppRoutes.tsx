import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import React from "react";
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.tsx";
import Layout from "../components/layout/Layout.tsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.tsx";
import Index from "../pages/Index.tsx";
import ProductsPage from "../pages/ProductsPage.tsx";
import AboutPage from '../pages/AboutPage.tsx';
import ContactPage from '../pages/ContactPage.tsx';
import FaqPage from '../pages/FaqPage.tsx';
import ReturnPolicyPage from "../pages/ReturnPolicyPage.tsx";
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage.tsx';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage.tsx';
import ShippingPage from '../pages/ShippingPage.tsx';
import ProfilePage from '../pages/ProfilePage.tsx';
import OrdersPage from '../pages/OrdersPage.tsx';
import WishlistPage from '../pages/WishlistPage.tsx';
import SettingsPage from '../pages/SettingsPage.tsx';


const AppRoutes: React.FC = () => {
    const authRoutes = [
        {path: "login", element: <LoginPage/>},
        {path: "register", element: <RegisterPage/>},
        {path: "forgot-password", element: <ForgotPasswordPage/>},
        {path: "reset-password", element: <ResetPasswordPage/>},
    ];
    const staticRoutes = [
        {path: "about", element: <AboutPage/>},
        {path: "contact", element: <ContactPage/>},
        {path: "faq", element: <FaqPage/>},
        {path: "return-policy", element: <ReturnPolicyPage/>},
        {path: "terms", element: <TermsAndConditionsPage/>},
        {path: "privacy", element: <PrivacyPolicyPage/>},
        {path: "shipping", element: <ShippingPage/>},
    ];

    const userRoutes = [
        {path: "profile", element: <ProfilePage/>},
        {path: "orders", element: <OrdersPage/>},
        {path: "wishlist", element: <WishlistPage/>},
        {path: "settings", element: <SettingsPage/>},
    ];
    const productRoutes = [
        {path: "products", element: <ProductsPage/>}
    ];
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route index path="/" element={<Index/>}/>
                    {[...authRoutes, ...staticRoutes, ...userRoutes, ...productRoutes].map(
                        ({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        )
                    )}
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    )

}
export default AppRoutes;