const express = require('express');
const {
  register,
  checkNewUser,
  resendCode,
  login,
  forgotPassword,
  sendPassword,
  modifyPassword,
  update,
  deleteUser,
  getAllUsers,
  getById,
  postFavorite,
  // modifyEmail,
} = require('../controllers/user.controller');

const { isAuth, isAuthAdmin } = require('../../middlewares/auth.middleware');

const UserRoutes = express.Router();

UserRoutes.post('/register', register);
UserRoutes.post('/check', checkNewUser);
UserRoutes.post('/resend', resendCode);
UserRoutes.post('/login', login);
UserRoutes.patch('/forgotpassword', forgotPassword);
UserRoutes.post('/postFavorite/:_id', [isAuth], postFavorite);
UserRoutes.get('/getAllUsers', [isAuthAdmin], getAllUsers);
UserRoutes.get('/getById/:_id', [isAuthAdmin], getById);
UserRoutes.patch('/changepassword', [isAuth], modifyPassword);
// UserRoutes.patch('/changeEmail/:_id', [isAuth], modifyEmail);
UserRoutes.patch('/update/update', [isAuth], update);
UserRoutes.delete('/', [isAuth], deleteUser);

//! -------REDIRECT --------------------

UserRoutes.patch('/forgotpassword/sendPassword/:id', sendPassword);

module.exports = UserRoutes;
