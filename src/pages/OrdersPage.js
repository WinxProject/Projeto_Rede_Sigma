import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderForm, setOrderForm] = useState({
    orderNumber: '',
    client: '',
    seller: '',
    manufacturer: '',
    orderDate: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState('all');
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrderList(savedOrders);
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orderList));
  }, [orderList]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (orderForm.orderNumber && orderForm.client && orderForm.seller && orderForm.manufacturer && orderForm.orderDate) {
      setOrderList(prevList => [...prevList, orderForm]);
      setOrderForm({ orderNumber: '', client: '', seller: '', manufacturer: '', orderDate: '' });
      setConfirmationMessage('Pedido cadastrado com sucesso!');
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  const handleSearch = () => {
    const results = searchOption === 'all'
      ? orderList.filter(order => 
          order.orderNumber.includes(searchQuery) ||
          order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : orderList.filter(order => 
          order[searchOption].toLowerCase().includes(searchQuery.toLowerCase())
        );

    setFilteredOrderList(results);
    setIsPopupVisible(results.length > 0);
  };

  const handleEdit = (index) => {
    const orderToEdit = filteredOrderList[index];
    setOrderForm(orderToEdit);
    setOrderList(orderList.filter(order => order !== orderToEdit));
    setIsPopupVisible(false);
  };

  const handleDelete = (index) => {
    setOrderList(orderList.filter((_, i) => i !== index));
    setIsPopupVisible(false);
  };

  return (
    <div className="orders-container5">
      <NavMenu />
      <h1>Controle de Pedidos às Montadoras</h1>
      {confirmationMessage && <div className="confirmation-message5">{confirmationMessage}</div>}
      
      <div className="search-container5">
        <input 
          type="text" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Buscar..." 
        />
        <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="all">Todos</option>
          <option value="orderNumber">Número do Pedido</option>
          <option value="client">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="manufacturer">Montadora</option>
        </select>
        <button className='btn-search5' onClick={handleSearch}>Buscar</button>
      </div>

      <form onSubmit={handleFormSubmit} className="order-input-form5">
        <input type="text" name="orderNumber" value={orderForm.orderNumber} onChange={handleInputChange} placeholder="Número do Pedido" required />
        <input type="text" name="client" value={orderForm.client} onChange={handleInputChange} placeholder="Cliente" required />
        <input type="text" name="seller" value={orderForm.seller} onChange={handleInputChange} placeholder="Vendedor" required />
        <input type="text" name="manufacturer" value={orderForm.manufacturer} onChange={handleInputChange} placeholder="Montadora" required />
        <input type="date" name="orderDate" value={orderForm.orderDate} onChange={handleInputChange} placeholder="Data do Pedido" required />
        <button type="submit">Adicionar Pedido</button>
      </form>

      {isPopupVisible && (
        <div className="popup-overlay5">
          <div className="popup-content5">
            <h2>Resultados da Busca</h2>
            <ul className="order-list5">
              {filteredOrderList.map((order, index) => (
                <li key={index}>
                  <div className="order-info5">Número do Pedido: {order.orderNumber}</div>
                  <div className="order-info5">Cliente: {order.client}</div>
                  <div className="order-info5">Vendedor: {order.seller}</div>
                  <div className="order-info5">Montadora: {order.manufacturer}</div>
                  <div className="order-info5">Data do Pedido: {order.orderDate}</div>
                  <div className="action-buttons5">
                    <button className='btn-edit5' onClick={() => handleEdit(index)}>Editar</button>
                    <button className='btn-delete5' onClick={() => handleDelete(index)}>Excluir</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className='btn-close5' onClick={() => setIsPopupVisible(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
