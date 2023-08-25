import { updateToken } from '../../utils/updateToken';
import { APIuser } from './serviceApiUser.config';

//! ------------------------------- REGISTER -----------------------------------

export const registerUser = async (formData) => {
  console.log(formData);
  return APIuser.post('/users/register', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------------------------VERIFYCODE----------------------------------

export const checkCodeConfirmationUser = async (formData) => {
  return APIuser.post('/users/check', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------------------LOGIN --------------------------------------------

export const loginUser = async (formData) => {
  return APIuser.post('/users/login', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------- RESEND CODE --------------------------------

export const resendCodeConfirmationUser = async (formData) => {
  console.log(formData);
  return APIuser.post('/users/resend', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ------------------------ FORGOT PASSWORD --------------------------------------
export const forgotPasswordUser = async (formData) => {
  return APIuser.patch('/users/forgotpassword', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------------- UPDATE ---------------------------------------

export const updateUser = async (formData) => {
  return APIuser.patch('/users/update/update', formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ----------------------- CHANGE PASSWORD -------------------------------

export const changePasswordUser = async (formData) => {
  return APIuser.patch('/users/changepassword', formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!----------------------- DELETE ---------------------------------------

export const deleteUser = async () => {
  return APIuser.delete('/users/', {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! --------------------------AÑADIR A FAVORITOS------------------------------------

export const postFavorite = async (carId) => {
  return APIuser.post(`/users/postFavorite/${carId}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
