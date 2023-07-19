const mongoose = require("mongoose");

// const { MONGO_URI } = require("./keys");
// const keys = require("./keys");
require("dotenv").config()

const dbConnection = async () => {
  try {
    // await mongoose.connect(keys.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Base de datos conectada con éxito");
  } catch (error) {
    console.error(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
