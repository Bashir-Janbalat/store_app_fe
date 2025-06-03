import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFound from '../pages/NotFound.tsx';
import React from "react";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Layout from "../components/layout/Layout.tsx";
import ResetPassword from "../pages/ResetPassword.tsx";
import Index from "../pages/Index.tsx";
import ProductsPage from "../pages/ProductsPage.tsx";


const AppRoutes: React.FC = () => {
    const authRoutes = [
        {path: "login", element: <Login/>},
        {path: "register", element: <Register/>},
        {path: "forgot-password", element: <ForgotPassword/>},
        {path: "reset-password", element: <ResetPassword/>},
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
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )

}
export default AppRoutes;