const User = require("../models/User");

const UserController = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).send({ message: "Usuario registrado con exito", user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error)
    }
  },
};

module.exports = UserController;
