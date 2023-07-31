import './Register.css';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { useRegisterError } from '../hooks';
import { registerUser } from '../service/API_user/user.service';

export const Register = () => {
  const { setAllUser, bridgeData } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [send, setSend] = useState(false);
  const [okRegister, setOkRegister] = useState(false);

  const formSubmit = async (formData) => {
    console.log(formData);
    setSend(true);
    setRes(await registerUser({ ...formData, rol: 'user' }));
    setSend(false);
  };

  useEffect(() => {
    console.log(res);
    useRegisterError(res, setOkRegister, setRes, setAllUser);
    if (res?.status == 201) bridgeData('ALLUSER');
  }, [res]);

  if (okRegister) {
    return <Navigate to="/verifyCode" />;
  }

  return (
    <>
      <div className="form-wrap">
        <h1>Sign Up</h1>
        <p>It’s free and only takes a minute.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container form-group">
            <input
              className="input_user"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register('name', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              username
            </label>
          </div>

          <div className="email_container form-group">
            <input
              className="input_user"
              type="email"
              id="email"
              name="email"
              autoComplete="false"
              {...register('email', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              email
            </label>
          </div>
          <div className="password_container form-group">
            <input
              className="input_user"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register('password', { required: true })}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
          </div>
          <div className="sexo">
            <input
              type="radio"
              name="sexo"
              id="hombre"
              value="hombre"
              {...register('gender')}
            />
            <label htmlFor="hombre" className="label-radio hombre">
              Male
            </label>
            <input
              type="radio"
              name="sexo"
              id="mujer"
              value="mujer"
              {...register('gender')}
            />
            <label htmlFor="mujer" className="label-radio mujer">
              Female
            </label>
          </div>
          <div className="btn_container">
            <button className="btn" type="submit" disabled={send}>
              Register
            </button>
          </div>
          <p className="bottom-text">
            <small>
              By clicking the Sign Up button, you agree to our{' '}
              <Link className="anchorCustom">Terms & Conditions</Link> and{' '}
              <Link className="anchorCustom">Privacy Policy</Link>.
            </small>
          </p>
        </form>
      </div>
      <div className="footerForm">
        <p className="parrafoLogin">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
    </>
  );
};
