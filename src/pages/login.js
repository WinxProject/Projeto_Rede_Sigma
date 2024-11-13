import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera os usuários cadastrados no localStorage
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verifica se o usuário existe e se a senha está correta
        const usuarioValido = usuariosCadastrados.find(
            (user) => user.email === email && user.senha === password
        );

        if (usuarioValido) {
            // Armazena o nome ou e-mail do usuário no localStorage para ser exibido na HomePage
            localStorage.setItem('userName', usuarioValido.nome || usuarioValido.email);
            localStorage.setItem('isAuthenticated', 'true');  // Marca o usuário como autenticado

            onLogin(usuarioValido); // Passa o usuário completo (com o grupo) para onLogin
        } else {
            alert('E-mail ou senha incorretos, para cadastro entre em contato pelo ramal: 5050');
        }
    };

    const handleForgotPassword = () => {
        alert('Entre em contato com o setor de T.I para redefinição de senha:\nRamal: 5050\nFone: 92 98853-1960');
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Rede Sigma</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="login-input"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="login-input"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">
                    Entrar
                </button>
                <a href="#" className="forgot-password" onClick={handleForgotPassword}>
                    Esqueci minha senha
                </a>
            </form>
        </div>
    );
};

export default Login;
