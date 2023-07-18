const Order = require("../models/Order.js");
const User = require("../models/User.js");

const OrderController = {
  async create(req, res) {
    try {
      //creamos el pedido
      const order = await Order.create({
        ...req.body,
        status: "pending",
        deliveryDate: new Date().setDate(new Date().getDate() + 2),
        userId: req.user._id,
      });
      //actualizamos el usuario para que tenga el id del pedido que acaba de crear
      await User.findByIdAndUpdate(req.user._id, {
        $push: { orderIds: order._id },
      });
      res.status(201).send(order);
    } catch (error) {
      console.error(error);
    }
  },
  async update(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        {
          new: true,
        }
      );
      res.send({ message: "order successfully updated", order });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = OrderController;
