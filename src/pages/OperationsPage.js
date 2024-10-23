import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './OperationsPage.css';
import NavMenu from './NavMenu'; 

function OperationsPage() {
  const [operations, setOperations] = useState([]);
  const [operation, setOperation] = useState({
    client: '',
    vehicle: {
      plate: '',
      brand: '',
      model: '',
      year: '',
      color: '',
      chassis: ''
    },
    seller: '',
    number: '',
    date: '',
    type: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [filteredOperations, setFilteredOperations] = useState([]);

  useEffect(() => {
    const storedOperations = JSON.parse(localStorage.getItem('operations')) || [];
    setOperations(storedOperations);
  }, []);

  const handleAddOperation = (e) => {
    e.preventDefault();
    let updatedOperations;

    if (editingIndex !== null) {
      updatedOperations = operations.map((op, index) => (index === editingIndex ? operation : op));
      setSuccessMessage('Operação atualizada com sucesso!');
    } else {
      updatedOperations = [...operations, operation];
      setSuccessMessage('Operação cadastrada com sucesso!');
    }

    setOperations(updatedOperations);
    localStorage.setItem('operations', JSON.stringify(updatedOperations));
    resetForm();
  };

  const handleEditOperation = (index) => {
    setOperation(operations[index]);
    setEditingIndex(index);
  };

  const handleDeleteOperation = (index) => {
    const updatedOperations = operations.filter((_, i) => i !== index);
    setOperations(updatedOperations);
    localStorage.setItem('operations', JSON.stringify(updatedOperations));
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = operations.filter(op => 
      op.client.toLowerCase().includes(term) || 
      op.seller.toLowerCase().includes(term) || 
      op.number.includes(term)
    );
    setFilteredOperations(results);
    setPopupVisible(results.length > 0);
  };

  const resetForm = () => {
    setOperation({
      client: '',
      vehicle: { plate: '', brand: '', model: '', year: '', color: '', chassis: '' },
      seller: '',
      number: '',
      date: '',
      type: '',
    });
    setEditingIndex(null);
  };

  return (
    <div className="operations-page">
      <NavMenu />
      <h1>Controle de Operações</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleAddOperation} className="operation-form">
        <label>Cliente:</label>
        <input
          type="text"
          value={operation.client}
          onChange={(e) => setOperation({ ...operation, client: e.target.value })}
          required
        />
        
        <label>Tipo de Operação:</label>
        <select
          value={operation.type}
          onChange={(e) => setOperation({ ...operation, type: e.target.value })}
          required
        >
          <option value="">Selecione</option>
          <option value="compra">Compra</option>
          <option value="venda">Venda</option>
        </select>

        <fieldset>
          <legend>Veículo</legend>
          <input
            type="text"
            placeholder="Placa"
            value={operation.vehicle.plate}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, plate: e.target.value } })}
            required
          />
          <input
            type="text"
            placeholder="Marca"
            value={operation.vehicle.brand}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, brand: e.target.value } })}
            required
          />
          <input
            type="text"
            placeholder="Modelo"
            value={operation.vehicle.model}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, model: e.target.value } })}
            required
          />
          <input
            type="text"
            placeholder="Ano"
            value={operation.vehicle.year}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, year: e.target.value } })}
            required
          />
          <input
            type="text"
            placeholder="Cor"
            value={operation.vehicle.color}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, color: e.target.value } })}
            required
          />
          <input
            type="text"
            placeholder="Chassi"
            value={operation.vehicle.chassis}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, chassis: e.target.value } })}
            required
          />
        </fieldset>

        <label>Vendedor:</label>
        <input
          type="text"
          value={operation.seller}
          onChange={(e) => setOperation({ ...operation, seller: e.target.value })}
          required
        />

        <label>Número da Operação:</label>
        <input
          type="text"
          value={operation.number}
          onChange={(e) => setOperation({ ...operation, number: e.target.value })}
          required
        />

        <label>Data:</label>
        <input
          type="date"
          value={operation.date}
          onChange={(e) => setOperation({ ...operation, date: e.target.value })}
          required
        />

        <button type="submit">
          {editingIndex !== null ? 'Atualizar Operação' : 'Cadastrar Operação'}
        </button>
      </form>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar Cliente ou Vendedor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={() => { setHasSearched(true); handleSearch(); }} className="btnbuscar">Buscar</button>
      </div>

      {popupVisible && (
        <div className="popup">
          <h2>Operações Encontradas</h2>
          {filteredOperations.length > 0 ? (
            <ul className="operations-list">
              {filteredOperations.map((op, index) => (
                <li key={index} className="operation-item">
                  <span>{`Cliente: ${op.client}, Veículo: ${op.vehicle.plate}, Vendedor: ${op.seller}, Número: ${op.number}, Data: ${op.date}, Tipo: ${op.type}`}</span>
                  <div className="operation-buttons">
                    <button className="edit-button" onClick={() => handleEditOperation(index)}>Editar</button>
                    <button className="delete-button" onClick={() => handleDeleteOperation(index)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma operação encontrada.</p>
          )}
          <button onClick={() => setPopupVisible(false)}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default OperationsPage;
