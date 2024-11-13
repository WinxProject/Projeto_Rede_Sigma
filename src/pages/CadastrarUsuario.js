import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import './CadastrarUsuario.css';

// Função para gerar um ID único de 3 dígitos
const gerarIdUnico = (usuariosCadastrados) => {
    let novoId;
    do {
        novoId = Math.floor(100 + Math.random() * 900); // Gera um número aleatório entre 100 e 999
    } while (usuariosCadastrados.some(usuario => usuario.id === novoId)); // Garante que o ID seja único
    return novoId;
};

const CadastrarUsuario = ({ addUser }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [setor, setSetor] = useState('usuario');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Recupera usuários cadastrados do localStorage
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verifica se o e-mail já está em uso
        if (usuariosCadastrados.some(usuario => usuario.email === email)) {
            // Exibe um alerta se o e-mail já estiver em uso
            window.alert('Este e-mail já está em uso.');
            return;
        }

        // Gera um ID único
        const idUnico = gerarIdUnico(usuariosCadastrados);

        // Cria o novo usuário
        const novoUsuario = { id: idUnico, nome, email, senha, setor };

        // Exibe a caixa de confirmação
        const confirmacao = window.confirm('Tem certeza que deseja cadastrar este usuário?');

        if (confirmacao) {
            // Salva o novo usuário no localStorage
            usuariosCadastrados.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosCadastrados));

            addUser(novoUsuario); // Atualiza o estado no componente pai, se necessário

            // Limpa os campos
            setNome('');
            setEmail('');
            setSenha('');
            setSetor('usuario');
        } else {
            // Caso o usuário não confirme, não faz nada
            window.alert('Cadastro cancelado.');
        }
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
            <div className="link-container">
                <Link to="/users">
                    <button className="botaocad">Ver Usuários Cadastrados</button>
                </Link>
            </div>
        </div>
    );
};

export default CadastrarUsuario;
