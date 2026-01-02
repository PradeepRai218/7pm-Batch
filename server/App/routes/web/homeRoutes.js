let express = require("express");
const { productTabs } = require("../../controllers/web/homeController");
let homeRouter = express.Router();

// homeRouter.get("/slider", (req, res) => {


homeRouter.get('/product-tabs',productTabs)    

module.exports = homeRouter;