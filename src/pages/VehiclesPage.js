import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu'; // Importar o NavMenu
import './VehiclesPage.css';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    plate: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    chassis: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('all');
  const [sortOrder, setSortOrder] = useState('brand');

  // Load vehicles from localStorage on component mount
  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    setVehicles(savedVehicles);
  }, []);

  // Save vehicles to localStorage whenever vehicles state changes
  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const formatPrice = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    const integerPart = numericValue.slice(0, -2);
    const decimalPart = numericValue.slice(-2);
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `R$ ${formattedInteger},${decimalPart}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      setForm(prevForm => ({ ...prevForm, [name]: formatPrice(value) }));
    } else {
      setForm(prevForm => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.plate && form.brand && form.model && form.year && form.price && form.color && form.chassis) {
      setVehicles(prevVehicles => [...prevVehicles, form]);
      setForm({ plate: '', brand: '', model: '', year: '', price: '', color: '', chassis: '' });
    }
  };

  const handleEdit = (index) => {
    const vehicleToEdit = vehicles[index];
    setForm(vehicleToEdit);
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    if (searchCriteria === 'all') {
      return vehicles;
    }
    return vehicles.filter(vehicle =>
      vehicle[searchCriteria].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const sortedVehicles = handleSearch().sort((a, b) => {
    if (sortOrder === 'brand-model') {
      if (a.brand === b.brand) {
        return a.model.localeCompare(b.model);
      }
      return a.brand.localeCompare(b.brand);
    }
    return a[sortOrder].localeCompare(b[sortOrder]);
  });

  return (
    <div className="vehicles-page">
      <NavMenu /> {/* Adicionado o NavMenu */}
      <h1>Controle de Veículos Disponíveis para Venda</h1>
      <form onSubmit={handleSubmit} className="vehicle-form">
        <input
          type="text"
          name="plate"
          value={form.plate}
          onChange={handleChange}
          placeholder="Placa"
          required
        />
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Marca"
          required
        />
        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Modelo"
          required
        />
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Ano"
          required
        />
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Preço (R$)"
          required
        />
        <input
          type="text"
          name="color"
          value={form.color}
          onChange={handleChange}
          placeholder="Cor"
          required
        />
        <input
          type="text"
          name="chassis"
          value={form.chassis}
          onChange={handleChange}
          placeholder="Número de Chassi"
          required
        />
        <button type="submit">Adicionar Veículo</button>
      </form>
      <div className="search-sort">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar..."
        />
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="plate">Placa</option>
          <option value="brand">Marca</option>
          <option value="model">Modelo</option>
        </select>
        <button onClick={handleSearch}>Buscar</button>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="brand">Ordenar por Marca</option>
          <option value="model">Ordenar por Modelo</option>
          <option value="brand-model">Ordenar por Marca e Modelo</option>
        </select>
      </div>
      <div className="vehicle-list">
        <div className="vehicle-list-header">
          <span>Placa</span>
          <span>Marca</span>
          <span>Modelo</span>
          <span>Ano</span>
          <span>Preço</span>
          <span>Cor</span>
          <span>Chassi</span>
          <span>Ações</span>
        </div>
        {sortedVehicles.length === 0 && <p>Nenhum veículo encontrado.</p>}
        <ul>
          {sortedVehicles.map((vehicle, index) => (
            <li key={index}>
              <span>{vehicle.plate}</span>
              <span>{vehicle.brand}</span>
              <span>{vehicle.model}</span>
              <span>{vehicle.year}</span>
              <span>{vehicle.price}</span>
              <span>{vehicle.color}</span>
              <span>{vehicle.chassis}</span>
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

export default VehiclesPage;
