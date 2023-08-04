import { updateToken } from '../../utils/updateToken';
import { APIcar } from './serviceApiCar.config';
import axios from 'axios';

//! -------------------------------NUEVO VEHICULO-----------------------------------

export const newCar = async (formData) => {
  return APIcar.post('/registerCar', formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------------------VER TODOS LOS VEHICULOS---------------------------------

export const getAllCars = async (formData) => {
  return APIcar.get('/getAllCars', formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -----------------------VER FOTOS DE TODOS LOS VEHICULOS-----------------------------

const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: 'Client-ID ie8q36os4au_uc5v-Sd6fk41RiPkn66jkS5aOpbl1aw', // Reemplaza con tu clave de acceso
  },
});

export const getAllCarImages = async () => {
  const response = await unsplash.get('/search/photos', {
    params: {
      query: 'car',
      per_page: 10, // Cantidad de imágenes que deseas obtener
    },
  });
  return response.data.results.map((result) => result.urls.regular);
};
