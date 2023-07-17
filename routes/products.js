const express = require("express")
const ProductController = require("../controllers/ProductController")
const router = express.Router()

router.get("/",ProductController.getAll)
router.get("/id/:_id",ProductController.getById)
router.get("/name/:name",ProductController.getProductsByName)
router.post("/", ProductController.create)
router.put("/id/:_id", ProductController.update)
router.delete("/id/:_id",ProductController.delete)

module.exports = router