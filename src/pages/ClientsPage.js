import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './ClientsPage.css';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    cpf: '',
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    neighborhood: '',
    city: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(savedClients);
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.cpf && form.name && form.email && form.phone) {
      if (editingIndex !== null) {
        const updatedClients = clients.map((client, index) =>
          index === editingIndex ? form : client
        );
        setClients(updatedClients);
        setEditingIndex(null);
      } else {
        setClients(prevClients => [...prevClients, form]);
      }
      setForm({ cpf: '', name: '', email: '', phone: '', street: '', number: '', neighborhood: '', city: '' });
      setConfirmationMessage('Cliente cadastrado com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleSearch = () => {
    const results = clients.filter(client =>
      client.cpf.includes(searchQuery) || client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(results);
    setIsPopupVisible(results.length > 0);
  };

  const handleEdit = (index) => {
    const clientToEdit = filteredClients[index];
    setForm(clientToEdit);
    setClients(clients.filter(client => client !== clientToEdit)); 
    setIsPopupVisible(false); 
  };

  const handleDelete = (index) => {
    setClients(clients.filter((_, i) => i !== index));
    setIsPopupVisible(false);
  };

  return (
    <div className="clients-container">
      <NavMenu />
      <h1>Cadastro de Clientes</h1>
      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}

      <div className="search-container">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Buscar CPF ou Nome..." 
        />
        <button className='btnbuscar1' onClick={handleSearch}>Buscar</button>
      </div>

      <form onSubmit={handleFormSubmit} className="client-input-form">
        <input type="text" name="cpf" value={form.cpf} onChange={handleInputChange} placeholder="CPF ou CNPJ" required />
        <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="Nome" required />
        <input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" required />
        <input type="tel" name="phone" value={form.phone} onChange={handleInputChange} placeholder="Telefone" required />
        <input type="text" name="street" value={form.street} onChange={handleInputChange} placeholder="Rua" required />
        <input type="text" name="number" value={form.number} onChange={handleInputChange} placeholder="Número" required />
        <input type="text" name="neighborhood" value={form.neighborhood} onChange={handleInputChange} placeholder="Bairro" required />
        <input type="text" name="city" value={form.city} onChange={handleInputChange} placeholder="Cidade" required />
        <button type="submit">Adicionar Cliente</button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Resultados da Busca</h2>
            <ul className="client-list">
              {filteredClients.map((client, index) => (
                <li key={index}>
                  <div className="client-info">CPF: {client.cpf}</div>
                  <div className="client-info">Nome: {client.name}</div>
                  <div className="client-info">Email: {client.email}</div>
                  <div className="client-info">Telefone: {client.phone}</div>
                  <div className="action-buttons">
                    <button className='btneditar1' onClick={() => handleEdit(index)}>Editar</button>
                    <button className='btnexcluir1'  onClick={() => handleDelete(index)}>Excluir</button>
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

export default ClientsPage;
