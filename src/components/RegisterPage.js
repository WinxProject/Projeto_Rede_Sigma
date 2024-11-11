import React, { useState } from 'react';
import './RegisterPage.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.password) {
      // Salva o usuário no localStorage (ou envie para o backend, se configurado)
      const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
      localStorage.setItem('users', JSON.stringify([...savedUsers, form]));
      
      setConfirmationMessage('Cadastro realizado com sucesso!');
      setForm({ name: '', email: '', password: '' });

      setTimeout(() => setConfirmationMessage(''), 3000); // Remove a mensagem de confirmação
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro de Usuário</h2>
      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
      <form onSubmit={handleFormSubmit} className="register-form">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleInputChange}
          placeholder="Senha"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
