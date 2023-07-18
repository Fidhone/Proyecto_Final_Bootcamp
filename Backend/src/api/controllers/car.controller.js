const Car = require('../models/car.model');
const User = require('../models/user.model');
const dotenv = require('dotenv');
const setError = require('../../helpers/handle-error');
dotenv.config();

//! ------------------------------------------------------------------------
//? -------------------------- NUEVO VEHICULO ------------------------------
//! ------------------------------------------------------------------------

const registerCar = async (req, res, next) => {
  try {
    const newCar = new Car(req.body);
    try {
      const savedCar = await newCar.save();
      return savedCar
        ? res.status(200).json(savedCar)
        : res.status(404).json('Error creating Car');
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(
      setError(500 || error.code, 'General error creating car' || error.message)
    );
  }
};

//! ------------------------------------------------------------------------
//? ------------------------ ACTUALIZAR VEHICULO ---------------------------
//! ------------------------------------------------------------------------

const updateCar = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const updatedCar = req.body;
    const searchCarById = await Car.findById(_id);
    if (req.body?.usuarios) {
      updatedCar.usuarios = searchCarById.usuarios;
    }
    const result = await Car.findByIdAndUpdate(_id, updatedCar, { new: true });

    if (result) {
      return res.status(200).json('update car');
    } else {
      return res.status(404).json('Car not found');
    }
  } catch (error) {
    return next(
      setError(500 || error.code, 'General error update car' || error.message)
    );
  }
};

//! ------------------------------------------------------------------------
//? ---------------------------BORRAR VEHICULO------------------------------
//! ------------------------------------------------------------------------

const deleteCar = async (req, res, next) => {
  try {
    const { _id } = req.params;

    await Car.findByIdAndDelete(_id);

    await User.updateMany({ favoritos: _id }, { $pull: { favoritos: _id } });

    const car = await Car.findById(_id);
    if (car) {
      return res.status(404).json('Car can`t be deleted');
    } else {
      return res.status(200).json('Car successfully deleted');
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? -------------------------VER TODOS LOS VEHICULOS------------------------
//! ------------------------------------------------------------------------

const getAllCars = async (req, res, next) => {
  try {
    const getAllCar = await Car.find();
    if (getAllCar) {
      return res.status(200).json(getAllCar).populate('User');
    } else {
      return res.status(404).json('Error to getAll CONTROLLER');
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? -------------------------VER VEHICULOS POR ID---------------------------
//! ------------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const carById = await Car.findById(_id);
    if (carById) {
      return res.status(200).json(carById).populate('User');
    } else {
      return res.status(404).json('Error controller GetById Car');
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerCar,
  updateCar,
  deleteCar,
  getAllCars,
  getById,
};
