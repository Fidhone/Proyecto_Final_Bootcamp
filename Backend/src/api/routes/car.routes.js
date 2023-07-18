const express = require('express');
const {
  registerCar,
  updateCar,
  deleteCar,
  getAllCars,
  getById,
} = require('../controllers/car.controller');

const { isAuthAdmin } = require('../../middlewares/auth.middleware');

const CarRoutes = express.Router();

CarRoutes.post('/registerCar', [isAuthAdmin], registerCar);
CarRoutes.patch('/updateCar/:_id', [isAuthAdmin], updateCar);
CarRoutes.delete('/deleteCar/:_id', [isAuthAdmin], deleteCar);
CarRoutes.get('/getAllCars', [isAuthAdmin], getAllCars);
CarRoutes.get('/getbyId/:_id', [isAuthAdmin], getById);

module.exports = CarRoutes;
