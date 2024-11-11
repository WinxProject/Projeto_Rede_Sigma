import React from "react";

const Usuarios = ({ usuarios }) => {
    return (
        <div className="usuarios-container">
            <h2>Usuários Cadastrados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Grupo</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.setor === 'admin' ? 'Administrador' : 'Usuário Padrão'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
