import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './OperationsPage.css';

const OperationsPage = () => {
  const [operations, setOperations] = useState([]);
  const [form, setForm] = useState({
    operationNumber: '',
    date: '',
    clientName: '',
    vehicle: '',
    seller: '',
    type: '', // Compra ou Venda
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOperations, setFilteredOperations] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const savedOperations = JSON.parse(localStorage.getItem('operations')) || [];
    setOperations(savedOperations);
  }, []);

  useEffect(() => {
    localStorage.setItem('operations', JSON.stringify(operations));
  }, [operations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.operationNumber && form.date && form.clientName && form.vehicle && form.seller) {
      if (editingIndex !== null) {
        const updatedOperations = operations.map((operation, index) =>
          index === editingIndex ? form : operation
        );
        setOperations(updatedOperations);
        setEditingIndex(null);
      } else {
        setOperations(prevOperations => [...prevOperations, form]);
      }
      setForm({ operationNumber: '', date: '', clientName: '', vehicle: '', seller: '', type: '' });
      setConfirmationMessage('Operação registrada com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleSearch = () => {
    const results = operations.filter(operation =>
      operation.operationNumber.includes(searchQuery) ||
      operation.date.includes(searchQuery) ||
      operation.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      operation.seller.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOperations(results);
    setIsPopupVisible(results.length > 0);
  };

  const handleEdit = (index) => {
    const operationToEdit = filteredOperations[index];
    setForm(operationToEdit);
    setOperations(operations.filter(operation => operation !== operationToEdit));
    setIsPopupVisible(false);
  };

  const handleDelete = (index) => {
    setOperations(operations.filter((_, i) => i !== index));
    setIsPopupVisible(false);
  };

  return (
    <div className="operations-container">
      <NavMenu />
      <h1>Controle das Operações Realizadas</h1>
      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por número, data, cliente ou vendedor..."
        />
        <button className='btnbuscar1' onClick={handleSearch}>Buscar</button>
      </div>

      <form onSubmit={handleFormSubmit} className="operation-input-form">
        <input
          type="text"
          name="operationNumber"
          value={form.operationNumber}
          onChange={handleInputChange}
          placeholder="Número da operação"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          placeholder="Data"
          required
        />
        <input
          type="text"
          name="clientName"
          value={form.clientName}
          onChange={handleInputChange}
          placeholder="Nome do Cliente"
          required
        />
        <input
          type="text"
          name="vehicle"
          value={form.vehicle}
          onChange={handleInputChange}
          placeholder="Veículo"
          required
        />
        <input
          type="text"
          name="seller"
          value={form.seller}
          onChange={handleInputChange}
          placeholder="Vendedor"
          required
        />
        <select name="type" value={form.type} onChange={handleInputChange} required>
          <option value="">Selecione o tipo de operação</option>
          <option value="Compra">Compra</option>
          <option value="Venda">Venda</option>
        </select>
        <button type="submit">Adicionar Operação</button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Resultados da Busca</h2>
            <ul className="operation-list">
              {filteredOperations.map((operation, index) => (
                <li key={index}>
                  <div className="operation-info">Número: {operation.operationNumber}</div>
                  <div className="operation-info">Data: {operation.date}</div>
                  <div className="operation-info">Cliente: {operation.clientName}</div>
                  <div className="operation-info">Veículo: {operation.vehicle}</div>
                  <div className="operation-info">Vendedor: {operation.seller}</div>
                  <div className="action-buttons">
                    <button className='btneditar1' onClick={() => handleEdit(index)}>Editar</button>
                    <button className='btnexcluir1' onClick={() => handleDelete(index)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='btnfechar1' onClick={() => setIsPopupVisible(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationsPage;
