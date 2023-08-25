import './Profile.css';

import React, { useState } from 'react';

import { ChangePassword, CurrentUserInfo, FormProfile } from '../components';
import { useAuth } from '../context/authContext';
import { useDeleteUser } from '../hooks';

export const Profile = () => {
  const [changeRender, setChangeRender] = useState('info'); // Inicializar con 'info'
  const { user, setUser } = useAuth();
  console.log(user);

  return (
    <div>
      <div className="containerNavProfile">
        <a
          className="iconNav iconCurrentUserInfo"
          onClick={() => setChangeRender('info')}
        >
          Información de usuario
        </a>
        <a className="iconNav iconChangeName" onClick={() => setChangeRender('name')}>
          Cambiar nombre
        </a>
        <a
          className="iconNav iconChangePassword"
          onClick={() => setChangeRender('password')}
        >
          Cambiar contraseña
        </a>
        <a className="iconNav iconDeleteUser" onClick={() => useDeleteUser(setUser)}>
          Borrar usuario
        </a>
      </div>
      <div className="fluidContainerProfile">
        {changeRender === 'info' && <CurrentUserInfo user={user} />}
        {changeRender === 'name' && <FormProfile />}
        {changeRender === 'password' && <ChangePassword />}
      </div>
    </div>
  );
};
