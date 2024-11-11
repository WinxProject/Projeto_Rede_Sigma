// NavMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <nav className="nav-menu">
      <button className="menu-toggle1" onClick={toggleMenu}>
        {isOpen ? 'Fechar' : 'Menu'}
      </button>
      {isOpen && (
        <ul className="menu-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/clients">Clientes</Link></li>
          <li><Link to="/vehicles">Veículos</Link></li>
          <li><Link to="/operations">Operações</Link></li>
          <li><Link to="/orders">Pedidos</Link></li>
          <li><Link to="/manufacturers">Montadoras</Link></li>
          <li><Link to="/sellers">Vendedores</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavMenu;
