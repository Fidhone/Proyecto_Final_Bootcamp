import { updateToken } from '../../utils/updateToken';
import { APIcar } from './serviceApiCar.config';

//! -------------------------------NUEVO VEHICULO -----------------------------------

export const newCar = async (formData) => {
  return APIcar.post('/registerCar', formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
