import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { newCar } from '../service/API_car/car.service';

export const Admin = () => {
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});

  //! ---------- FUNCION QUE GESTIONA LA DATA DEL FORMULARIO-----------------------
  const formSubmit = async (formData) => {
    setRes(await newCar(formData));
  };

  //! ---------USEffect ASOCIADO A LA RES PARA GESTIONAR LOS ERRORES----------------
  useEffect(() => {
    // Aquí puedes manejar los errores de respuesta si es necesario
  }, [res]);

  //! ---------- EL FORMULARIO SIMILAR AL QUE MOSTRASTE PARA Login --------------
  return (
    <div className="form-wrap">
      <h2>Registrar Nuevo Vehiculo</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="form-group">
          <label htmlFor="custom-input">Marca:</label>
          <input type="text" {...register('marca', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="custom-input">Modelo:</label>
          <input type="text" {...register('modelo', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="custom-input">Color:</label>
          <input type="text" {...register('color', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="custom-input">Año:</label>
          <input type="text" {...register('año', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="custom-input">Kilometros:</label>
          <input type="text" {...register('kilometros', { required: true })} />
        </div>
        <div className="form-group">
          <label htmlFor="custom-input">Precio:</label>
          <input type="text" {...register('Precio', { required: true })} />
        </div>

        <button className="btn" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};
