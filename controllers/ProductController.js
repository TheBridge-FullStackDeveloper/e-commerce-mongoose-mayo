const Product = require("../models/Product");

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send({ message: "Producto creado con éxito", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error al crear un producto", error });
    }
  },
  //   async getAll(req, res) {
  //     try {
  //        const products = await Product.find()
  //        res.send(products)
  //     } catch (error) {
  //         console.error(error);
  //           res.status(500).send(error)
  //     }
  // },
  getAll(req, res) {
    Product.find()
      .then((products) => res.send(products))
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
  },
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params._id);
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  //   async getProductsByName(req, res) {
  //     try {
  //       if (req.params.name.length > 20) {
  //         return res.status(400).send("Búsqueda demasiado larga");
  //       }
  //       const name = new RegExp(req.params.name, "i"); //la i es para que sea insensible a las mayusculas y minusculass
  //       //   const products = await Product.find({name:name});
  //       const products = await Product.find({ name });
  //       res.send(products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  async getProductsByName(req, res) {
    //búsqueda indice "palabra entera" sino no funciona
    try {
      const products = await Product.find({
        $text: {
          $search: req.params.name,
        },
      });
      res.send(products);
    } catch (error) {
      console.log(error);
    }
  },
  async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params._id);
      res.send({ message: "Product deleted", product });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "there was a problem trying to remove the product" });
    }
  },
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params._id,// a quien actualizamos
        req.body,// que actualizamos
        { new: true }// para que nos devuelva el producto ya actualizado
      );
      res.send({ message: "product successfully updated", product });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ProductController;
