import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import NavMenu from './NavMenu';
import './CadastrarUsuario.css';

const CadastrarUsuario = ({ addUser }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [setor, setSetor] = useState('usuario');

    const handleSubmit = (e) => {
        e.preventDefault();

        const novoUsuario = { nome, email, senha, setor };
        addUser(novoUsuario);  // Adiciona o novo usuário ao estado no componente pai

        // Limpa os campos após o envio do formulário
        setNome('');
        setEmail('');
        setSenha('');
        setSetor('usuario');
    };

    return (
        <div className="cadastro-container1">
            <NavMenu />
            <h2>Cadastrar Novo Usuário</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label>E-mail:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <label>Grupo:</label>
                <select value={setor} onChange={(e) => setSetor(e.target.value)} required>
                    <option value="usuario">Usuário Padrão</option>
                    <option value="admin">Administrador</option>
                </select>

                <button className="botaocad" type="submit">Cadastrar</button>
            </form>

            {/* Link para a página de usuários cadastrados */}
            <div className="link-container">
                <Link to="/users">
                    <button className="botaocad">Ver Usuários Cadastrados</button>
                </Link>
            </div>
        </div>
    );
};

export default CadastrarUsuario;
