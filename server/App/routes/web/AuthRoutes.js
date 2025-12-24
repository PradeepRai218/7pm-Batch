let express=require("express")
const { sendOtp, createUser, login } = require("../../controllers/web/authController")

let AuthRoutes=express.Router()


AuthRoutes.post('/send-otp',sendOtp)

AuthRoutes.post('/create',createUser)
module.exports={AuthRoutes}


AuthRoutes.post('/login',login)

// AuthRoutes.post('/forgot-password')

// AuthRoutes.post('/reset-password')

// AuthRoutes.post('/change-password')
// AuthRoutes.post('/update-password')


