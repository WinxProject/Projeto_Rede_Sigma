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
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para o modal

  // Carregar operações do localStorage ao carregar a página
  useEffect(() => {
    const savedOperations = JSON.parse(localStorage.getItem('operations')) || [];
    setOperations(savedOperations);
  }, []);

  // Salvar operações no localStorage quando a lista de operações mudar
  useEffect(() => {
    localStorage.setItem('operations', JSON.stringify(operations));
  }, [operations]);

  // Função para lidar com as mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Função para lidar com o envio do formulário
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.operationNumber && form.date && form.clientName && form.vehicle && form.seller) {
      if (editingIndex !== null) {
        // Atualizar operação existente
        const updatedOperations = operations.map((operation, index) =>
          index === editingIndex ? form : operation
        );
        setOperations(updatedOperations);
        setEditingIndex(null);
      } else {
        // Adicionar nova operação
        setOperations(prevOperations => [...prevOperations, form]);
      }
      // Resetar o formulário
      setForm({ operationNumber: '', date: '', clientName: '', vehicle: '', seller: '', type: '' });
      setConfirmationMessage('Operação registrada com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  // Função para buscar operações
  const handleSearch = () => {
    const results = operations.filter(operation => {
      return (
        (operation.operationNumber ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (operation.date ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (operation.clientName ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (operation.seller ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredOperations(results);
    setIsModalVisible(results.length > 0); // Mostrar o modal se houver resultados
  };

  // Função para editar operação
  const handleEdit = (index) => {
    const operationToEdit = operations[index];
    setForm(operationToEdit);
    setEditingIndex(index);
    setIsModalVisible(false);
  };

  // Função para deletar operação
  const handleDelete = (index) => {
    const updatedOperations = operations.filter((_, i) => i !== index);
    setOperations(updatedOperations);
    setIsModalVisible(false);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalVisible(false);
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
        <button className="btnbuscar1" onClick={handleSearch}>Buscar</button>
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

      {/* Modal para exibir resultados da pesquisa */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Resultados da Pesquisa</h2>
            {filteredOperations.length === 0 && <div>Nenhum resultado encontrado.</div>}
            <ul className="operation-list">
              {filteredOperations.map((operation, index) => (
                <li key={index}>
                  <div className="operation-info">Número: {operation.operationNumber}</div>
                  <div className="operation-info">Data: {operation.date}</div>
                  <div className="operation-info">Cliente: {operation.clientName}</div>
                  <div className="operation-info">Veículo: {operation.vehicle}</div>
                  <div className="operation-info">Vendedor: {operation.seller}</div>
                  <div className="operation-info">Tipo: {operation.type}</div>
                  <div className="action-buttons">
                    <button className="btneditar1" onClick={() => handleEdit(index)}>Editar</button>
                    <button className="btnexcluir1" onClick={() => handleDelete(index)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OperationsPage;
