const express = require("express")
const OrderController = require("../controllers/OrderController")
const { authentication, isAuthor } = require("../middleware/authentication")
const router = express.Router()

router.post("/",authentication, OrderController.create)
router.put("/id/:_id", authentication,isAuthor, OrderController.update)

module.exports = router