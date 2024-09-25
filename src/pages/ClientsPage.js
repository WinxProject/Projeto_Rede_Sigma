import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Adicionado para navegação
import './ClientsPage.css';
import NavMenu from './NavMenu'; // Importado o NavMenu

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('name');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('clients')) || [];
    setClients(savedClients);
  }, []);

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
  }, [clients]);

  const formatCPF_CNPJ = (value) => {
    value = value.replace(/\D/g, '');
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, function (match, p1, p2, p3, p4) {
        return [p1, p2, p3, p4].filter(Boolean).join('.').replace(/(\d{3}\.\d{3}\.\d{3})(\d{2})?/, '$1-$2');
      });
    } else {
      return value.replace(/(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, function (match, p1, p2, p3, p4, p5) {
        return [p1, p2, p3, p4, p5].filter(Boolean).join('.').replace(/(\d{2}\.\d{3}\.\d{3})\/(\d{4})-(\d{2})/, '$1/$2-$3');
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      setForm(prevForm => ({ ...prevForm, [name]: formatCPF_CNPJ(value) }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
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
      setForm({ 
        cpf: '', name: '', email: '', phone: '', 
        street: '', number: '', neighborhood: '', city: '' 
      });
    }
  };

  const handleEdit = (index) => {
    const clientToEdit = clients[index];
    setForm(clientToEdit);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedClients = clients.filter((_, i) => i !== index);
    setClients(updatedClients);
  };

  const handleSearch = () => {
    return clients.filter(client =>
      client.cpf.includes(searchTerm) || client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortedClients = handleSearch().sort((a, b) => {
    if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.cpf.localeCompare(b.cpf);
  });

  return (
    <div className="clients-page">
      <NavMenu /> {/* Adicionado o NavMenu */}
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={handleSubmit} className="client-form">
        <input
          type="text"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
          placeholder="CPF ou CNPJ"
          required
          maxLength={18}
        />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Telefone"
          required
        />
        <input
          type="text"
          name="street"
          value={form.street}
          onChange={handleChange}
          placeholder="Rua"
          required
        />
        <input
          type="text"
          name="number"
          value={form.number}
          onChange={handleChange}
          placeholder="Número"
          required
        />
        <input
          type="text"
          name="neighborhood"
          value={form.neighborhood}
          onChange={handleChange}
          placeholder="Bairro"
          required
        />
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Cidade"
          required
        />
        <button type="submit">{editingIndex !== null ? 'Atualizar Cliente' : 'Adicionar Cliente'}</button>
      </form>
      <div className="search-sort">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por CPF/CNPJ ou Nome..."
        />
        <button onClick={() => setSearchTerm('')}>Buscar</button>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="name">Ordenar por Nome</option>
          <option value="cpf">Ordenar por CPF</option>
        </select>
      </div>
      <div className="client-list">
        <div className="client-list-header">
          <span>CPF/CNPJ</span>
          <span>Nome</span>
          <span>Email</span>
          <span>Telefone</span>
          <span>Endereço</span>
          <span>Ações</span>
        </div>
        {sortedClients.length === 0 && <p>Nenhum cliente encontrado.</p>}
        <ul>
          {sortedClients.map((client, index) => (
            <li key={index}>
              <span>{client.cpf}</span>
              <span>{client.name}</span>
              <span>{client.email}</span>
              <span>{client.phone}</span>
              <span>{client.street}, {client.number} - {client.neighborhood}, {client.city}</span>
              <div className="actions">
                <button onClick={() => handleEdit(index)}>Editar</button>
                <button onClick={() => handleDelete(index)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientsPage;
