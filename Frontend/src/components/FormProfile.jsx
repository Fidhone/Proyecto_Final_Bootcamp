import './FormProfile.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

import { useAuth } from '../context/authContext';
import { useUpdateError } from '../hooks';
import { updateUser } from '../service/API_user/user.service';

export const FormProfile = () => {
  const { user, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);

  const defaultData = {
    name: user?.user,
  };

  //! ------------ 1) La funcion que gestiona el formulario----
  const formSubmit = (formData) => {
    console.log('entro');
    Swal.fire({
      title: 'Are you sure you want to change your user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(73, 193, 162)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'YES',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setSend(true);
        setRes(await updateUser(formData));
        setSend(false);
      }
    });
  };

  //! -------------- 2 ) useEffect que gestiona la parte de la respuesta ------- customHook

  useEffect(() => {
    console.log(res);
    useUpdateError(res, setRes, setUser);
  }, [res]);

  return (
    <>
      <div className="containerProfile">
        <div className="containerDataNoChange"></div>
        <div className="form-wrap formProfile">
          <h1>Change your user name ♻</h1>
          <p>Please, enter your new user name</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="user_container form-group">
              <input
                className="input_user"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register('name')}
              />
              <label htmlFor="custom-input" className="custom-placeholder">
                username
              </label>
            </div>
            <div className="btn_container">
              <button
                className="btn"
                type="submit"
                disabled={send}
                style={{ background: send ? '#49c1a388' : '#49c1a2' }}
              >
                CHANGE USERNAME
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
