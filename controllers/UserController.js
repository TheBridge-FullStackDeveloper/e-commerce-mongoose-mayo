const transporter = require("../config/nodemailer");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const { jwt_secret } = require("../config/keys");
require("dotenv").config();

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
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); //creamos el token
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
  async recoverPassword(req, res) {
    try {
      const recoverToken = jwt.sign(
        { email: req.params.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        }
      );
      const url = "http://localhost:3000/users/resetPassword/" + recoverToken;
      await transporter.sendMail({
        to: req.params.email,
        subject: "Recuperar contraseña",
        html: `<h3> Recuperar contraseña </h3>
  <a href="${url}">Recuperar contraseña</a>
  El enlace expirará en 48 horas
  `,
      });
      res.send({
        message: "Un correo de recuperación se envio a tu dirección de correo",
      });
    } catch (error) {
      console.error(error);
    }
  },
  async resetPassword(req, res) {
    try {
      const recoverToken = req.params.recoverToken;
      console.log(recoverToken)
      const payload = jwt.verify(recoverToken, process.env.JWT_SECRET);
      console.log(payload)
      await User.findOneAndUpdate(
        { email: payload.email },
        { password: req.body.password }
      );
      res.send({ message: "contraseña cambiada con éxito" });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
