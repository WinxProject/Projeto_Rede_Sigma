import React, { useState } from "react";
import { Link } from "react-router-dom";
import './UsuariosPage.css';
import NavMenu from './NavMenu';
import 'font-awesome/css/font-awesome.min.css'; // Importando a folha de estilos do Font Awesome

const Usuarios = ({ usuarios, onEditUser, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPassword, setEditedPassword] = useState('');

  const ID_USUARIO_PRINCIPAL = 100;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (usuario) => {
    setEditingUserId(usuario.id);
    setEditedName(usuario.nome);
    setEditedEmail(usuario.email);
    setEditedPassword('');
  };

  const handleSaveEdit = () => {
    if (editingUserId !== null) {
      onEditUser({ 
        id: editingUserId, 
        nome: editedName, 
        email: editedEmail,
        senha: editedPassword || null
      });
      setEditingUserId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleDeleteClick = (userId) => {
    if (userId === ID_USUARIO_PRINCIPAL) {
      alert('Este usuário não pode ser excluído porque é o usuário principal.');
      return;
    }
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      onDeleteUser(userId);
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    const nome = usuario.nome || '';
    const email = usuario.email || '';
    return (
      nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="usuarios-container">
      <NavMenu />
      <h2>Usuários Cadastrados</h2>

      {/* Botão com ícone para Cadastro de Novo Usuário */}
      <Link to="/register">
        <button className="novo-usuario-button">
          <i className="fa fa-plus" aria-hidden="true"></i> Novo Usuário
        </button>
      </Link>

      {/* Barra de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome ou e-mail"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Grupo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.setor === 'admin' ? 'Administrador' : 'Usuário Padrão'}</td>
              <td>
                <button 
                  className="edit-button" 
                  onClick={() => handleEditClick(usuario)}
                >
                  Editar
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteClick(usuario.id)}
                  disabled={usuario.id === ID_USUARIO_PRINCIPAL}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUserId !== null && (
        <div className="edit-modal">
          <h3>Editando Usuário</h3>
          <input
            type="text"
            placeholder="Nome"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="edit-input"
          />
          <input
            type="email"
            placeholder="E-mail"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            className="edit-input"
          />
          <input
            type="password"
            placeholder="Nova Senha (deixe em branco se não for alterar)"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
            className="edit-input"
          />
          <button 
            className="save-button" 
            onClick={handleSaveEdit}
          >
            Salvar
          </button>
          <button 
            className="cancel-button" 
            onClick={handleCancelEdit}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
