import './CurrentUserInfo.css';

import React from 'react';
export const CurrentUserInfo = ({ user }) => {
  return (
    <>
      <h2 className="h2-current">MIS DATOS</h2>
      <div className="currentUserInfo">
        <p>
          <strong>Nombre de Usuario:</strong> {user.user}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Rol:</strong> {user.rol}
        </p>
        <p>
          <strong>Genero:</strong> {user.gender}
        </p>
        <p>
          <strong>Usuario verificado:</strong> {user.check ? 'si' : 'no'}
        </p>
      </div>
    </>
  );
};
