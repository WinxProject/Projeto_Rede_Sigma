import React, { useState, useEffect } from 'react';
import NavMenu from './NavMenu';
import './UsuariosPage.css';

const UsuariosPage = ({ onEditUser, onDeleteUser }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editedUser, setEditedUser] = useState({});

    // Carrega os usuários do localStorage ao iniciar o componente
    useEffect(() => {
        const savedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(savedUsers);
    }, []);

    // Salva os usuários no localStorage sempre que a lista de usuários muda
    useEffect(() => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }, [usuarios]);

    // Função para adicionar usuário
    const addUser = (usuario) => {
        const updatedUsers = [...usuarios, usuario];
        setUsuarios(updatedUsers);
    };

    // Função para lidar com o filtro de busca
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Função para começar a editar um usuário
    const handleEditClick = (usuario) => {
        setIsEditing(usuario.id);
        setEditedUser(usuario);
    };

    // Função para lidar com as alterações no formulário de edição
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Função para salvar as alterações de edição
    const handleSaveEdit = () => {
        const updatedUsers = usuarios.map((user) =>
            user.id === editedUser.id ? editedUser : user
        );
        setUsuarios(updatedUsers);
        setIsEditing(null);
        setEditedUser({});
    };

    // Função para cancelar a edição
    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditedUser({});
    };

    // Função para confirmar exclusão de usuário
    const handleDeleteClick = (userId) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
        if (confirmDelete) {
            const updatedUsers = usuarios.filter((user) => user.id !== userId);
            setUsuarios(updatedUsers);
        }
    };

    // Filtrar usuários com base no termo de pesquisa
    const filteredUsers = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="usuarios-container">
            <NavMenu />
            <h2>Usuários Cadastrados</h2>
            
            <input
                type="text"
                placeholder="Pesquisar por nome ou e-mail..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            {filteredUsers.length > 0 ? (
                <ul className="user-list">
                    {filteredUsers.map((usuario) => (
                        <li key={usuario.id} className="user-item">
                            {isEditing === usuario.id ? (
                                <div className="edit-user-form">
                                    <input
                                        type="text"
                                        name="nome"
                                        value={editedUser.nome}
                                        onChange={handleEditChange}
                                        placeholder="Nome"
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        value={editedUser.email}
                                        onChange={handleEditChange}
                                        placeholder="E-mail"
                                    />
                                    <input
                                        type="text"
                                        name="setor"
                                        value={editedUser.setor}
                                        onChange={handleEditChange}
                                        placeholder="Setor"
                                    />
                                    <button onClick={handleSaveEdit} className="save-btn">Salvar</button>
                                    <button onClick={handleCancelEdit} className="cancel-btn">Cancelar</button>
                                </div>
                            ) : (
                                <div className="user-details">
                                    <p><strong>Nome:</strong> {usuario.nome}</p>
                                    <p><strong>E-mail:</strong> {usuario.email}</p>
                                    <p><strong>Grupo:</strong> {usuario.setor}</p>
                                </div>
                            )}
                            <div className="user-actions">
                                {isEditing !== usuario.id && (
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEditClick(usuario)}>
                                        Editar
                                    </button>
                                )}
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDeleteClick(usuario.id)}>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum usuário encontrado.</p>
            )}
        </div>
    );
};

export default UsuariosPage;
