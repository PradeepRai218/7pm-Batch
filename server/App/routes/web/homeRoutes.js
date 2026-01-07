let express = require("express");
const { productTabs, megaMenu } = require("../../controllers/web/homeController");
let homeRouter = express.Router();

// homeRouter.get("/slider", (req, res) => {


homeRouter.get('/product-tabs',productTabs)    
homeRouter.get('/mega-menu',megaMenu)    

module.exports = homeRouter;