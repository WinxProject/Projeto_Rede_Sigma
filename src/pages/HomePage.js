import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ onLogout }) => {
    const navigate = useNavigate(); // Hook para navegação

    const handleLogout = () => {
        onLogout(); // Chama a função de logout passada como prop
        navigate('/'); // Redireciona para a página de login
    };

    return (
        <div className="home-container">
            <h1 className="title">Sistema Moderno de Gerenciamento</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Botão de logout */}
            <div className="menu-grid">
                <div className="menu-item">
                    <h2>Clientes</h2>
                    <p>Gerencie informações dos clientes de forma eficiente.</p>
                    <Link to="/clients" className="menu-link">Ver Clientes</Link>
                </div>
                <div className="menu-item">
                    <h2>Veículos</h2>
                    <p>Controle completo dos veículos disponíveis.</p>
                    <Link to="/vehicles" className="menu-link">Ver Veículos</Link>
                </div>
                <div className="menu-item">
                    <h2>Operações</h2>
                    <p>Registro detalhado das operações de compra e venda.</p>
                    <Link to="/operations" className="menu-link">Ver Operações</Link>
                </div>
                <div className="menu-item">
                    <h2>Pedidos</h2>
                    <p>Gerencie todos os pedidos de forma rápida e prática.</p>
                    <Link to="/orders" className="menu-link">Ver Pedidos</Link>
                </div>
                <div className="menu-item">
                    <h2>Montadoras</h2>
                    <p>Controle e visualize todas as montadoras parceiras.</p>
                    <Link to="/manufacturers" className="menu-link">Ver Montadoras</Link>
                </div>
                <div className="menu-item">
                    <h2>Vendedores</h2>
                    <p>Gerencie informações dos vendedores.</p>
                    <Link to="/sellers" className="menu-link">Ver Vendedores</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
