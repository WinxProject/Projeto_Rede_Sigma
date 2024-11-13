import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ onLogout, userGroup }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName, setUserName] = useState('');  // Estado para armazenar o nome ou e-mail do usuário

    const handleLogout = () => {
        onLogout();
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        navigate('/');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);  // Recupera o nome ou e-mail do usuário armazenado
        }
    }, []);

    return (
        <div className="home-container">
            <div className="top-menu1">
                <h1 className="title">REDE SIGMA</h1>
                
                {/* Exibe o nome ou e-mail do usuário */}
                <p>Bem-vindo, {userName || 'Visitante'}</p> {/* Se o nome não for encontrado, exibe "Visitante" */}

                {/* Verifica o grupo do usuário */}
                {userGroup === 'admin' ? (
                    <div className="dropdown1">
                        <button className="dropdown-toggle1" onClick={toggleDropdown}>
                            Cadastros
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu1">
                                <Link to="/users" className="dropdown-item1">Usuários</Link>
                                <Link to="/register" className="dropdown-item1">Novo Usuário</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Você não tem permissão para acessar o botão "Cadastros".</p>
                )}

                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <div className="menu-grid">
                {/* Outros itens do menu */}
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
                
                {/* Verifica o grupo do usuário antes de exibir o card de Vendedores */}
                {userGroup === 'admin' && (
                    <div className="menu-item">
                        <h2>Vendedores</h2>
                        <p>Gerencie informações dos vendedores.</p>
                        <Link to="/sellers" className="menu-link">Ver Vendedores</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
