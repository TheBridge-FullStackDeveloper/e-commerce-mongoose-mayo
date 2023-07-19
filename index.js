const express = require("express")
const { dbConnection } = require("./config/config")
const { handleTypeError } = require("./middleware/errors")
const app = express()
require("dotenv").config();// para poder usar las variables de entorno

const PORT = process.env.PORT || 3001;

dbConnection()

app.use(express.json())//parsea el body, sino es undefined (middleware)

app.use("/products",require("./routes/products"))
app.use("/users",require("./routes/users"))
app.use("/orders",require("./routes/orders"))

app.use(handleTypeError)

app.listen(PORT,()=> console.log(`Servidor levantado en el puerto ${PORT}`))