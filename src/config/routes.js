import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ClientsPage from '../pages/ClientsPage';
import VehiclesPage from '../pages/VehiclesPage';
import OperationsPage from '../pages/OperationsPage';
import OrdersPage from '../pages/OrdersPage';
import ManufacturersPage from '../pages/ManufacturersPage';
import SellersPage from '../pages/SellersPage';
import LoginPage from '../pages/login'; // Importando sua página de login

const RoutesConfig = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

    useEffect(() => {
        // Verifica se o usuário já está autenticado ao carregar o componente
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Função para simular o login
    const handleLogin = (username, password) => {
        // Lógica de autenticação (substitua por sua chamada de API de login)
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true); // Usuário autenticado
            localStorage.setItem('isAuthenticated', 'true'); // Armazena a autenticação no localStorage
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); // Remove a autenticação do localStorage
    };

    return (
        <Router>
            <Routes>
                {/* Se não estiver autenticado, mostra a página de login */}
                <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/home" />} />

                {/* Rotas protegidas */}
                <Route path="/home" element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" />} />
                <Route path="/clients" element={isAuthenticated ? <ClientsPage /> : <Navigate to="/" />} />
                <Route path="/vehicles" element={isAuthenticated ? <VehiclesPage /> : <Navigate to="/" />} />
                <Route path="/operations" element={isAuthenticated ? <OperationsPage /> : <Navigate to="/" />} />
                <Route path="/orders" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" />} />
                <Route path="/manufacturers" element={isAuthenticated ? <ManufacturersPage /> : <Navigate to="/" />} />
                <Route path="/sellers" element={isAuthenticated ? <SellersPage /> : <Navigate to="/" />} />

                {/* Redireciona para login se o usuário não estiver autenticado */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default RoutesConfig;
