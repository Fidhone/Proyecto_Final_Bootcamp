import './Profile.css';

import { useState } from 'react';

import { ChangePassword, FormProfile } from '../components';
import { useAuth } from '../context/authContext';
import { useDeleteUser } from '../hooks';

export const Profile = () => {
  const [changeRender, setChangeRender] = useState(true);
  const { setUser } = useAuth();

  return (
    <>
      <div className="containerNavProfile">
        <a className="iconNav iconChangeName" onClick={() => setChangeRender(true)}>
          Cambiar nombre
        </a>
        <a className="iconNav iconChangePassword" onClick={() => setChangeRender(false)}>
          Cambiar contraseña
        </a>
        <a className="iconNav iconDeleteUser" onClick={() => useDeleteUser(setUser)}>
          Borrar usuario
        </a>
      </div>
      <div className="fluidContainerProfile">
        {changeRender ? <FormProfile /> : <ChangePassword />}
      </div>
    </>
  );
};
