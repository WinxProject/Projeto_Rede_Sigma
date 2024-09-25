import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adicionado para navegação
import './OperationsPage.css';
import NavMenu from './NavMenu'; // Importado o NavMenu

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
    details: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('client');
  const [hasSearched, setHasSearched] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    const storedOperations = JSON.parse(localStorage.getItem('operations')) || [];
    setOperations(storedOperations);
  }, []);

  const handleAddOperation = (e) => {
    e.preventDefault();

    let updatedOperations;
    if (editingIndex !== null) {
      updatedOperations = operations.map((op, index) => (index === editingIndex ? operation : op));
      setEditingIndex(null);
      setSuccessMessage('Operação atualizada com sucesso!');
    } else {
      updatedOperations = [...operations, operation];
      setSuccessMessage('Operação cadastrada com sucesso!');
    }

    setOperations(updatedOperations);
    localStorage.setItem('operations', JSON.stringify(updatedOperations));
    setOperation({
      client: '',
      vehicle: { plate: '', brand: '', model: '', year: '', color: '', chassis: '' },
      seller: '',
      number: '',
      date: '',
      type: '',
      details: ''
    });
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
    return operations.filter(op => {
      const term = searchTerm.toLowerCase();
      switch (searchCategory) {
        case 'client':
          return op.client.toLowerCase().includes(term);
        case 'seller':
          return op.seller.toLowerCase().includes(term);
        case 'number':
          return op.number.includes(term);
        case 'date':
          return op.date.includes(term);
        default:
          return false;
      }
    });
  };

  const filteredOperations = hasSearched ? handleSearch() : operations;

  return (
    
    <div className="operations-page">
      <NavMenu /> {/* Adicionado o NavMenu */}
      <h1>Controle de Operações</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="search-container">
        <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="search-category">
          <option value="client">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="number">Número</option>
          <option value="date">Data</option>
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button onClick={() => setHasSearched(true)} className="search-button">Buscar</button>
      </div>

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
          <label>Placa:</label>
          <input
            type="text"
            value={operation.vehicle.plate}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, plate: e.target.value } })}
            required
          />

          <label>Marca:</label>
          <input
            type="text"
            value={operation.vehicle.brand}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, brand: e.target.value } })}
            required
          />

          <label>Modelo:</label>
          <input
            type="text"
            value={operation.vehicle.model}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, model: e.target.value } })}
            required
          />

          <label>Ano:</label>
          <input
            type="text"
            value={operation.vehicle.year}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, year: e.target.value } })}
            required
          />

          <label>Cor:</label>
          <input
            type="text"
            value={operation.vehicle.color}
            onChange={(e) => setOperation({ ...operation, vehicle: { ...operation.vehicle, color: e.target.value } })}
            required
          />

          <label>Chassi:</label>
          <input
            type="text"
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

      {hasSearched && (
        <>
          <h2>Operações Realizadas</h2>
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
        </>
      )}
    </div>
  );
}

export default OperationsPage;
