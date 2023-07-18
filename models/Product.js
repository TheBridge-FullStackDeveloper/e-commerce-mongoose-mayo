const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    reviews: [
      {
        userId: { type: ObjectId, ref: "User" },
        comment: {
          type: String,
          required: [true, "Por favor rellena la review"],
        },
      },
    ],
    likes: [{ type: ObjectId , ref:"User"}],
  },
  { timestamps: true }
);

ProductSchema.index({
  name: "text",
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
