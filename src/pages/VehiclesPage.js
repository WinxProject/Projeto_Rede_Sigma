import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './VehiclesPage.css';

const VehiclesPage = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleForm, setVehicleForm] = useState({
    plate: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    chassis: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [filteredVehicleList, setFilteredVehicleList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Estado para controlar o popup

  useEffect(() => {
    const savedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    setVehicleList(savedVehicles);
  }, []);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicleList));
  }, [vehicleList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (vehicleForm.plate && vehicleForm.brand && vehicleForm.model && vehicleForm.year && vehicleForm.price && vehicleForm.color && vehicleForm.chassis) {
      setVehicleList(prevList => [...prevList, vehicleForm]);
      setVehicleForm({ plate: '', brand: '', model: '', year: '', price: '', color: '', chassis: '' });
      setConfirmationMessage('Veículo cadastrado com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleSearch = () => {
    const results = searchOption === 'all' 
      ? vehicleList.filter(vehicle => 
          vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : vehicleList.filter(vehicle => 
          vehicle[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
        );

    setFilteredVehicleList(results);
    setIsPopupVisible(results.length > 0); // Exibe o popup se houver resultados
  };

  const handleEdit = (index) => {
    const vehicleToEdit = filteredVehicleList[index];
    setVehicleForm(vehicleToEdit);
    setVehicleList(vehicleList.filter(vehicle => vehicle !== vehicleToEdit)); // Remove do estado original
    setIsPopupVisible(false); //aqui estou fechando o popup
  };

  const handleDelete = (index) => {
    setVehicleList(vehicleList.filter((_, i) => i !== index));
    setIsPopupVisible(false); // Fecha o popup
  };

  return (
    <div className="vehicles-container10">
      <NavMenu />
      <h1>Controle de Veículos Disponíveis para Venda</h1>
      {confirmationMessage && <div className="confirmation-message10">{confirmationMessage}</div>}
      
      <div className="search-container10">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Buscar..." 
        />
        <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="all">Todos</option>
          <option value="plate">Placa</option>
          <option value="brand">Marca</option>
          <option value="model">Modelo</option>
        </select>
        <button className='btnbuscar10' onClick={handleSearch}>Buscar</button>
      </div>

      <form onSubmit={handleFormSubmit} className="vehicle-input-form10">
        <input type="text" name="plate" value={vehicleForm.plate} onChange={handleInputChange} placeholder="Placa" required />
        <input type="text" name="brand" value={vehicleForm.brand} onChange={handleInputChange} placeholder="Marca" required />
        <input type="text" name="model" value={vehicleForm.model} onChange={handleInputChange} placeholder="Modelo" required />
        <input type="number" name="year" value={vehicleForm.year} onChange={handleInputChange} placeholder="Ano" required />
        <input type="text" name="price" value={vehicleForm.price} onChange={handleInputChange} placeholder="Preço (R$)" required />
        <input type="text" name="color" value={vehicleForm.color} onChange={handleInputChange} placeholder="Cor" required />
        <input type="text" name="chassis" value={vehicleForm.chassis} onChange={handleInputChange} placeholder="Número de Chassi" required />
        <button type="submit">Adicionar Veículo</button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay10">
          <div className="popup-content10">
            <h2>Resultados da Busca</h2>
            <ul className="vehicle-list10">
              {filteredVehicleList.map((vehicle, index) => (
                <li key={index}>
                  <div className="vehicle-info10">Placa: {vehicle.plate}</div>
                  <div className="vehicle-info10">Marca: {vehicle.brand}</div>
                  <div className="vehicle-info10">Modelo: {vehicle.model}</div>
                  <div className="vehicle-info10">Ano: {vehicle.year}</div>
                  <div className="vehicle-info10">Preço: {vehicle.price}</div>
                  <div className="vehicle-info10">Cor: {vehicle.color}</div>
                  <div className="vehicle-info10">Chassi: {vehicle.chassis}</div>
                  <div className="action-buttons10">
                    <button className='btneditar' onClick={() => handleEdit(index)}>Editar</button>
                    <button className='btnexcluir' onClick={() => handleDelete(index)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => setIsPopupVisible(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
