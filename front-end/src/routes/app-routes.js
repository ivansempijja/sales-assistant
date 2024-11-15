import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from './private-route';


import { LoginPage } from '../pages/auth/login-page';
import { DashboardPage } from '../pages/dashboard/dashbaord';
import FollowUps from '../pages/dashboard/follow-ups';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            <DashboardPage/>
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/leads/:leadId"
                    element={
                        <PrivateRoute>
                            <FollowUps/>
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };