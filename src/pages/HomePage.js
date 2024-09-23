import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="title">Bem-vindo ao Sistema de Gerenciamento de Veículos</h1>
            <div className="menu-grid">
                <div className="menu-item">
                    <h2>Clientes</h2>
                    <p>Gerencie informações dos clientes.</p>
                    <Link to="/clients" className="menu-link">Ir para Clientes</Link>
                </div>
                <div className="menu-item">
                    <h2>Veículos</h2>
                    <p>Controle dos veículos disponíveis para venda.</p>
                    <Link to="/vehicles" className="menu-link">Ir para Veículos</Link>
                </div>
                <div className="menu-item">
                    <h2>Operações</h2>
                    <p>Registro e visualização das operações de compra e venda.</p>
                    <Link to="/operations" className="menu-link">Ir para Operações</Link>
                </div>
                <div className="menu-item">
                    <h2>Pedidos</h2>
                    <p>Gerencie os pedidos feitos às montadoras.</p>
                    <Link to="/orders" className="menu-link">Ir para Pedidos</Link>
                </div>
                <div className="menu-item">
                    <h2>Montadoras</h2>
                    <p>Controle das montadoras parceiras.</p>
                    <Link to="/manufacturers" className="menu-link">Ir para Montadoras</Link>
                </div>
                <div className="menu-item">
                    <h2>Vendedores</h2>
                    <p>Gerencie os vendedores.</p>
                    <Link to="/sellers" className="menu-link">Ir para Vendedores</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
