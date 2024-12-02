import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './ManufacturersPage.css';

const ManufacturersPage = () => {
  const [manufacturerList, setManufacturerList] = useState([]);
  const [manufacturerForm, setManufacturerForm] = useState({
    cnpj: '',
    name: '',
    brand: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [filteredManufacturerList, setFilteredManufacturerList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const savedManufacturers = JSON.parse(localStorage.getItem('manufacturers')) || [];
    setManufacturerList(savedManufacturers);
  }, []);

  useEffect(() => {
    localStorage.setItem('manufacturers', JSON.stringify(manufacturerList));
  }, [manufacturerList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManufacturerForm(prevForm => ({ ...prevForm, [name]: value.toUpperCase() }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (manufacturerForm.cnpj && manufacturerForm.name && manufacturerForm.brand) {
      setManufacturerList(prevList => [...prevList, manufacturerForm]);
      setManufacturerForm({ cnpj: '', name: '', brand: '' });
      setConfirmationMessage('Montadora cadastrada com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleSearch = () => {
    const results = searchOption === 'all'
      ? manufacturerList.filter(manufacturer => 
          manufacturer.cnpj.includes(searchQuery) ||
          manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          manufacturer.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : manufacturerList.filter(manufacturer => 
          manufacturer[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
        );

    setFilteredManufacturerList(results);
    setIsPopupVisible(results.length > 0);
  };

  const handleEdit = (index) => {
    const manufacturerToEdit = filteredManufacturerList[index];
    setManufacturerForm(manufacturerToEdit);
    setManufacturerList(manufacturerList.filter(manufacturer => manufacturer !== manufacturerToEdit));
    setIsPopupVisible(false);
  };

  const handleDelete = (index) => {
    setManufacturerList(manufacturerList.filter((_, i) => i !== index));
    setIsPopupVisible(false);
  };

  return (
    <div className="manufacturers-container">
      <NavMenu />
      <h1>Controle das Montadoras</h1>
      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      
      <div className="search-container">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Buscar por CNPJ ou Marca..." 
        />
        <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="all">Todos</option>
          <option value="cnpj">CNPJ</option>
          <option value="brand">Marca</option>
        </select>
        <button className='btn-search' onClick={handleSearch}>Buscar</button>
      </div>

      <form onSubmit={handleFormSubmit} className="manufacturer-input-form">
        <input type="text" name="cnpj" value={manufacturerForm.cnpj} onChange={handleInputChange} placeholder="CNPJ" required />
        <input type="text" name="name" value={manufacturerForm.name} onChange={handleInputChange} placeholder="Nome da Montadora" required />
        <input type="text" name="brand" value={manufacturerForm.brand} onChange={handleInputChange} placeholder="Marca" required />
        <button type="submit">Adicionar Montadora</button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Resultados da Busca</h2>
            <ul className="manufacturer-list">
              {filteredManufacturerList.map((manufacturer, index) => (
                <li key={index}>
                  <div className="manufacturer-info">CNPJ: {manufacturer.cnpj}</div>
                  <div className="manufacturer-info">Nome: {manufacturer.name}</div>
                  <div className="manufacturer-info">Marca: {manufacturer.brand}</div>
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

export default ManufacturersPage;
