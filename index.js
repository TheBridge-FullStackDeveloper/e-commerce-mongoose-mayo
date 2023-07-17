const express = require("express")
const { dbConnection } = require("./config/config")
const app = express()
const PORT = 3000

dbConnection()

app.use(express.json())//parsea el body, sino es undefined (middleware)

app.use("/products",require("./routes/products"))
app.use("/users",require("./routes/users"))

app.listen(PORT,()=> console.log(`Servidor levantado en el puerto ${PORT}`))