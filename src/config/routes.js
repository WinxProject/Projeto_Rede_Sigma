// src/config/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ClientsPage from '../pages/ClientsPage';
import VehiclesPage from '../pages/VehiclesPage';
import OperationsPage from '../pages/OperationsPage';
import OrdersPage from '../pages/OrdersPage';
import ManufacturersPage from '../pages/ManufacturersPage';
import SellersPage from '../pages/SellersPage';

const RoutesConfig = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/operations" element={<OperationsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/manufacturers" element={<ManufacturersPage />} />
                <Route path="/sellers" element={<SellersPage />} />
            </Routes>
        </Router>
    );
};

export default RoutesConfig;
