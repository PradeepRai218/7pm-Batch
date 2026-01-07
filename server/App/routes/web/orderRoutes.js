let express = require("express");
const { createOrder } = require("../../controllers/web/orderController");
let orderRouter = express.Router();

orderRouter.post('/create',createOrder)

module.exports={orderRouter}