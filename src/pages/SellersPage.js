import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './SellersPage.css'

const SalespeoplePage = () => {
  const [salespeopleList, setSalespeopleList] = useState([]);
  const [salespersonForm, setSalespersonForm] = useState({
    code: '',
    username: '',
    fullName: '',
    phone: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [filteredSalespeopleList, setFilteredSalespeopleList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Carrega os vendedores do localStorage ou inicia com lista vazia
  useEffect(() => {
    const savedSalespeople = JSON.parse(localStorage.getItem('salespeople')) || [];
    setSalespeopleList(savedSalespeople);
  }, []);

  useEffect(() => {
    localStorage.setItem('salespeople', JSON.stringify(salespeopleList));
  }, [salespeopleList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalespersonForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (salespersonForm.code && salespersonForm.username && salespersonForm.fullName) {
      setSalespeopleList((prevList) => [...prevList, salespersonForm]);
      setSalespersonForm({ code: '', username: '', fullName: '', phone: '' });
      setConfirmationMessage('Vendedor cadastrado com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleSearch = () => {
    const results = searchOption === 'all'
      ? salespeopleList.filter((salesperson) =>
          salesperson.code.includes(searchQuery) ||
          salesperson.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          salesperson.fullName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : salespeopleList.filter((salesperson) =>
          salesperson[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
        );

    setFilteredSalespeopleList(results);
    setIsPopupVisible(results.length > 0);
  };

  const handleEdit = (index) => {
    const salespersonToEdit = filteredSalespeopleList[index];
    setSalespersonForm(salespersonToEdit);
    setSalespeopleList(salespeopleList.filter((salesperson) => salesperson !== salespersonToEdit));
    setIsPopupVisible(false);
  };

  const handleDelete = (index) => {
    setSalespeopleList(salespeopleList.filter((_, i) => i !== index));
    setIsPopupVisible(false);
  };

  return (
    <div className="salespeople-container">
      <NavMenu />
      <h1>Controle dos Vendedores</h1>
      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      
      <div className="search-container">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Buscar por código ou usuário..." 
        />
        <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="all">Todos</option>
          <option value="code">Código</option>
          <option value="username">Usuário</option>
        </select>
        <button className='btn-search' onClick={handleSearch}>Buscar</button>
      </div>

      <form onSubmit={handleFormSubmit} className="salesperson-input-form">
        <input type="text" name="code" value={salespersonForm.code} onChange={handleInputChange} placeholder="Código" required />
        <input type="text" name="username" value={salespersonForm.username} onChange={handleInputChange} placeholder="Usuário" required />
        <input type="text" name="fullName" value={salespersonForm.fullName} onChange={handleInputChange} placeholder="Nome Completo" required />
        <input type="text" name="phone" value={salespersonForm.phone} onChange={handleInputChange} placeholder="email" />
        <button type="submit">Adicionar Vendedor</button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Resultados da Busca</h2>
            <ul className="salespeople-list">
              {filteredSalespeopleList.map((salesperson, index) => (
                <li key={index}>
                  <div className="salesperson-info">Código: {salesperson.code}</div>
                  <div className="salesperson-info">Usuário: {salesperson.username}</div>
                  <div className="salesperson-info">Nome: {salesperson.fullName}</div>
                  <div className="salesperson-info">Email: {salesperson.phone}</div>
                  <div className="action-buttons">
                    <button className='btn-edit' onClick={() => handleEdit(index)}>Editar</button>
                    <button className='btn-delete' onClick={() => handleDelete(index)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='btn-close' onClick={() => setIsPopupVisible(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalespeoplePage;
