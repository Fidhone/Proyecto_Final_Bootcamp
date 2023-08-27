const User = require('../models/user.model');
const Car = require('../models/car.model');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const setError = require('../../helpers/handle-error');
const { generateToken } = require('../../utils/token');
const randomPassword = require('../../utils/randomPassword');
dotenv.config();

//! ------------------------------------------------------------------------
//? -------------------------REGISTRO NUEVO USUARIO-------------------------
//! ------------------------------------------------------------------------

const register = async (req, res, next) => {
  console.log(req.body);
  try {
    await User.syncIndexes();
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const confirmationCode = Math.floor(
      Math.random() * (999999 - 100000) + 100000
    );

    const newUser = new User({ ...req.body, confirmationCode });

    const userExists = await User.findOne({
      email: newUser.email,
      name: newUser.name,
    });

    if (userExists) {
      return next(setError(409, 'This user already exist'));
    } else {
      try {
        const createUser = await newUser.save();
        createUser.password = null;

        const mailOptions = {
          from: email,
          to: req.body.email,
          subject: 'Code confirmation',
          text: `Your code is ${confirmationCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        return res.status(201).json({
          user: createUser,
          confirmationCode: confirmationCode,
        });
      } catch (error) {
        return res.status(404).json(error.message);
      }
    }
  } catch (error) {
    return next(
      setError(error.code || 500, error.message || 'failed create user')
    );
  }
};

//! ------------------------------------------------------------------------
//? -------------------------CHECKEAR NUEVO USUARIO-------------------------
//! ------------------------------------------------------------------------

const checkNewUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json('User not found');
    } else {
      if (confirmationCode === userExists.confirmationCode) {
        try {
          await userExists.updateOne({ check: true });
          const updateUser = await User.findOne({ email });

          return res.status(200).json({
            testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        await User.findByIdAndDelete(userExists._id);

        return res.status(200).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))
            ? 'error delete user'
            : 'ok delete user',
        });
      }
    }
  } catch (error) {
    return next(setError(500, 'General error check code'));
  }
};

//! ------------------------------------------------------------------------
//? ---------------------REENVIAR CODIGO DE CONFIRMACION--------------------
//! ------------------------------------------------------------------------

const resendCode = async (req, res, next) => {
  try {
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: 'Confirmation code ',
        text: `tu codigo es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json('User not found');
    }
  } catch (error) {
    return next(setError(500, error.message || 'Error general send code'));
  }
};

//! ------------------------------------------------------------------------
//? ----------------------------INICIO DE SESION----------------------------
//! ------------------------------------------------------------------------
const login = async (req, res, next) => {
  try {
    // nos traemos
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      // comparamos la contrase del body con la del user de la DB
      if (bcrypt.compareSync(password, userDB.password)) {
        // si coinciden generamos el token
        const token = generateToken(userDB._id, email);
        // mandamos la respuesta con el token
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json('password dont match');
      }
    } else {
      return res.status(404).json('User no register');
    }
  } catch (error) {
    return next(
      setError(500 || error.code, 'General error login' || error.message)
    );
  }
};

//! ------------------------------------------------------------------------
//? --------------------CAMBIO CONTRASEÑA SIN ESTAR LOGADO------------------
//! ------------------------------------------------------------------------

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const userDb = await User.findOne({ email });
    if (userDb) {
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/users/forgotpassword/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json('User not register');
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDb = await User.findById(id);

    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: email,
        pass: password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let passwordSecure = randomPassword();
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: '-----',
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };
    transporter.sendMail(mailOptions, async function (error) {
      if (error) {
        console.log(error);

        return res.status(404).json('dont sent email and dont update user');
      } else {
        const newPasswordHash = bcrypt.hashSync(passwordSecure, 10);

        try {
          await User.findByIdAndUpdate(id, { password: newPasswordHash });

          /// !! --> TEESTEAMOS QUE SE HA HECHO TODO CORRECTAMENTE
          const updateUser = await User.findById(id);
          if (bcrypt.compareSync(passwordSecure, updateUser.password)) {
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json('entro por aqui');
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? ---------------------CAMBIO CONTRASEÑA ESTANDO LOGADO-------------------
//! ------------------------------------------------------------------------

const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    const { _id } = req.user;
    if (bcrypt.compareSync(password, req.user.password)) {
      const newPasswordHash = bcrypt.hashSync(newPassword, 10);
      try {
        await User.findByIdAndUpdate(_id, { password: newPasswordHash });

        const updateUser = await User.findById(_id);

        if (bcrypt.compareSync(newPassword, updateUser.password)) {
          return res.status(200).json({
            updateUser: true,
          });
        } else {
          return res.status(404).json({
            updateUser: false,
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      return res.status(404).json('password not match');
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? ---------------------------ACTUALIZAR USUARIO---------------------------
//! ------------------------------------------------------------------------

const update = async (req, res, next) => {
  try {
    await User.syncIndexes();
    const patchUser = new User(req.body);

    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.check = req.user.check;
    patchUser.favoritos = req.user.favoritos;

    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);

      //! ----------------test  runtime ----------------
      const updateUser = await User.findById(req.user._id);

      const updateKeys = Object.keys(req.body);

      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateUser[item] == req.body[item]) {
          testUpdate.push({
            [item]: true,
          });
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });
      return res.status(200).json({
        testUpdate,
      });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? ----------------------------BORRAR USUARIO------------------------------
//! ------------------------------------------------------------------------

const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndDelete(_id);
    await Car.updateMany({ usuarios: _id }, { $pull: { usuarios: _id } });
    const user = await User.findById(_id);
    if (user) {
      return res.status(404).json('User can`t be deleted');
    } else {
      return res.status(200).json('User successfully deleted');
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? -------------------------VER TODOS LOS USUARIOS-------------------------
//! ------------------------------------------------------------------------

const getAllUsers = async (req, res, next) => {
  try {
    const getAllUser = await User.find();
    if (getAllUser) {
      return res.status(200).json(getAllUser).populate('Car');
    } else {
      return res.status(404).json('Error to getAll CONTROLLER');
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? --------------------------VER VEHICULOS POR ID--------------------------
//! ------------------------------------------------------------------------

const getById = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const userById = await User.findById(_id);
    if (userById) {
      return res.status(200).json(userById).populate('Car');
    } else {
      return res.status(404).json('Error controller GetById User');
    }
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? ----------------------AGREGAR VEHICULO A FAVORITOS----------------------
//! ------------------------------------------------------------------------

const postFavorite = async (req, res, next) => {
  try {
    const { carId } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    const car = await Car.findById(carId);

    if (!user) {
      return res.status(404).json('User not found');
    }
    if (!car) {
      return res.status(404).json('Car not found');
    }

    if (user.favoritos.includes(carId)) {
      return res.status(400).json('Car allready exist in favorite`s list');
    }
    if (car.usuarios.includes(_id)) {
      return res.status(400).json('User allready exist in user`s list');
    }

    user.favoritos.push(carId);
    await user.save();
    car.usuarios.push(_id);
    await car.save();

    res.status(200).json('Car add to favorite`s list');
  } catch (error) {
    return next(error);
  }
};

//! ------------------------------------------------------------------------
//? ---------------------ELIMINAR VEHICULO DE FAVORITOS---------------------
//! ------------------------------------------------------------------------

const removeFavorite = async (req, res, next) => {
  try {
    const { carId } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    const car = await Car.findById(carId);

    if (!user) {
      return res.status(404).json('User not found');
    }
    if (!car) {
      return res.status(404).json('Car not found');
    }

    if (!user.favoritos.includes(carId)) {
      return res.status(400).json('Car not found in favorite`s list');
    }
    if (!car.usuarios.includes(_id)) {
      return res.status(400).json('User not found in user`s list');
    }

    // Utilizamos $pull para eliminar el carId del array de favoritos del usuario
    user.favoritos.pull(carId);
    await user.save();

    // Utilizamos $pull para eliminar el userId del array de usuarios en el coche
    car.usuarios.pull(_id);
    await car.save();

    res.status(200).json('Car removed from favorite`s list');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
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
  removeFavorite,
};
