import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage.tsx';
import React from "react";
import Index from "../pages/Index.tsx";
import Login from "../pages/Login.tsx";


const AppRoutes: React.FC = () => {
    const authRoutes = [
        {path: "login", element: <Login/>}
    ];


    return (
        <Router>
            <Routes>
                <Route index path="/" element={<Index/>}/>
                {authRoutes.map(({path, element}) => (
                    <Route key={path} path={path} element={element}/>
                ))}
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    )

}
export default AppRoutes;