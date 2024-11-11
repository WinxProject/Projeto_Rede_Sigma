import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ClientsPage from '../pages/ClientsPage';
import VehiclesPage from '../pages/VehiclesPage';
import OperationsPage from '../pages/OperationsPage';
import OrdersPage from '../pages/OrdersPage';
import ManufacturersPage from '../pages/ManufacturersPage';
import SellersPage from '../pages/SellersPage';
import LoginPage from '../pages/login';
import CadastrarUsuario from '../pages/CadastrarUsuario';
import UsuariosPage from '../pages/UsuariosPage';

const RoutesConfig = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [usuarios, setUsuarios] = useState([]);

    // Carregar usuários do localStorage ao iniciar
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }

        const savedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(savedUsers);  // Carrega os usuários do localStorage
    }, []);

    // Salvar usuários no localStorage quando houver alterações
    useEffect(() => {
        if (usuarios.length > 0) {
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }, [usuarios]);

    const handleLogin = (username, password) => {
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    const addUser = (usuario) => {
        setUsuarios([...usuarios, usuario]);
    };

    // Função para editar um usuário
    const editUser = (usuarioEditado) => {
        setUsuarios((prevUsuarios) =>
            prevUsuarios.map((user) => (user.id === usuarioEditado.id ? usuarioEditado : user))
        );
    };

    // Função para excluir um usuário
    const deleteUser = (userId) => {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.id !== userId));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/home" />} />

                {/* Rotas protegidas */}
                <Route path="/home" element={isAuthenticated ? <HomePage onLogout={handleLogout} /> : <Navigate to="/" />} />
                <Route path="/clients" element={isAuthenticated ? <ClientsPage /> : <Navigate to="/" />} />
                <Route path="/vehicles" element={isAuthenticated ? <VehiclesPage /> : <Navigate to="/" />} />
                <Route path="/operations" element={isAuthenticated ? <OperationsPage /> : <Navigate to="/" />} />
                <Route path="/orders" element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" />} />
                <Route path="/manufacturers" element={isAuthenticated ? <ManufacturersPage /> : <Navigate to="/" />} />
                <Route path="/sellers" element={isAuthenticated ? <SellersPage /> : <Navigate to="/" />} />

                {/* Rotas para cadastro e exibição de usuários */}
                <Route path="/register" element={isAuthenticated ? <CadastrarUsuario addUser={addUser} /> : <Navigate to="/" />} />
                <Route 
                    path="/users" 
                    element={
                        isAuthenticated ? 
                        <UsuariosPage 
                            usuarios={usuarios} 
                            onEditUser={editUser} 
                            onDeleteUser={deleteUser} 
                        /> 
                        : <Navigate to="/" />
                    } 
                />

                {/* Redireciona para login se o usuário não estiver autenticado */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default RoutesConfig;
