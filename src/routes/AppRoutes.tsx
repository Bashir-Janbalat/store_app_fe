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


const AppRoutes: React.FC = () => {
    const authRoutes = [
        {path: "login", element: <LoginPage/>},
        {path: "register", element: <RegisterPage/>},
        {path: "forgot-password", element: <ForgotPasswordPage/>},
        {path: "reset-password", element: <ResetPasswordPage/>},
    ];
    const productRoutes = [
        {path: "products", element: <ProductsPage/>},
    ];
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route index path="/" element={<Index/>}/>
                    {[...authRoutes, ...productRoutes].map(
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