const express = require("express")
const ProductController = require("../controllers/ProductController")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()


router.get("/",ProductController.getAll)
router.get("/id/:_id",ProductController.getById)
router.get("/name/:name",ProductController.getProductsByName)
router.post("/",authentication,isAdmin, ProductController.create)
router.put("/id/:_id",authentication,isAdmin, ProductController.update)
router.delete("/id/:_id",authentication,isAdmin,ProductController.delete)

module.exports = router