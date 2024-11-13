import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ClientsPage from '../pages/ClientsPage';
import VehiclesPage from '../pages/VehiclesPage';
import OperationsPage from '../pages/OperationsPage';
import OrdersPage from '../pages/OrdersPage';
import ManufacturersPage from '../pages/ManufacturersPage';
import SellersPage from '../pages/SellersPage';
import Login from '../pages/login';
import CadastrarUsuario from '../pages/CadastrarUsuario';
import UsuariosPage from '../pages/UsuariosPage';

const RoutesConfig = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userGroup, setUserGroup] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    // Recuperando o estado de autenticação e dados do usuário
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedUserGroup = localStorage.getItem('userGroup');
        
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
            setUserGroup(storedUserGroup || '');
        }

        const savedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(savedUsers);
    }, []);

    // Salvando alterações nos usuários no localStorage
    useEffect(() => {
        if (usuarios.length > 0) {
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }
    }, [usuarios]);

    const handleLogin = (usuario) => {
        if (usuario) {
            setIsAuthenticated(true);
            setUserGroup(usuario.setor);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userGroup', usuario.setor);
        } else {
            alert('E-mail ou senha incorretos');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserGroup('');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userGroup');
    };

    const addUser = (usuario) => {
        setUsuarios([...usuarios, usuario]);
    };

    const editUser = (usuarioEditado) => {
        setUsuarios((prevUsuarios) =>
            prevUsuarios.map((user) => (user.id === usuarioEditado.id ? usuarioEditado : user))
        );
    };

    const deleteUser = (userId) => {
        setUsuarios((prevUsuarios) => prevUsuarios.filter((user) => user.id !== userId));
    };

    return (
        <Routes>
            <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
            />
            <Route
                path="/home"
                element={isAuthenticated ? (
                    <HomePage userGroup={userGroup} onLogout={handleLogout} />
                ) : (
                    <Navigate to="/" />
                )}
            />
            <Route
                path="/clients"
                element={isAuthenticated ? <ClientsPage /> : <Navigate to="/" />}
            />
            <Route
                path="/vehicles"
                element={isAuthenticated ? <VehiclesPage /> : <Navigate to="/" />}
            />
            <Route
                path="/operations"
                element={isAuthenticated ? <OperationsPage /> : <Navigate to="/" />}
            />
            <Route
                path="/orders"
                element={isAuthenticated ? <OrdersPage /> : <Navigate to="/" />}
            />
            <Route
                path="/manufacturers"
                element={isAuthenticated ? <ManufacturersPage /> : <Navigate to="/" />}
            />
            <Route
                path="/sellers"
                element={isAuthenticated ? <SellersPage /> : <Navigate to="/" />}
            />
            <Route
                path="/register"
                element={isAuthenticated ? <CadastrarUsuario addUser={addUser} /> : <Navigate to="/" />}
            />
            <Route
                path="/users"
                element={isAuthenticated ? (
                    <UsuariosPage
                        usuarios={usuarios}
                        onEditUser={editUser}
                        onDeleteUser={deleteUser}
                    />
                ) : (
                    <Navigate to="/" />
                )}
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App = () => {
    return (
        <Router>
            <RoutesConfig />
        </Router>
    );
};

export default App;
