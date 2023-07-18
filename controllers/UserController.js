const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys");

const UserController = {
  async register(req, res, next) {
    try {
      // req.body.role ="user"
      const user = await User.create({ ...req.body, role: "user" });
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async login(req, res) {
    try {
      //buscamos el usuario que intenta logearse
      const user = await User.findOne({
        email: req.body.email,
      });
      const token = jwt.sign({ _id: user._id }, jwt_secret); //creamos el token
      if (user.tokens.length > 4) user.tokens.shift(); //limitamos las sesiones que pueda tener el usuario
      user.tokens.push(token); // guardamos el nuevo token en el array de tokens del usuario
      await user.save(); //guardamos el usuario modificado en base de datos (.save()método de mongoose)
      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .populate({
          path: "orderIds",
          populate: {
            path: "productIds",
          },
        })
        // .populate({
        //   path: "wishList",
        // })
        .populate("wishList");


      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
