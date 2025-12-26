let express=require("express")
const { sendOtp, createUser, login, changePassword } = require("../../controllers/web/authController")

let AuthRoutes=express.Router()


AuthRoutes.post('/send-otp',sendOtp)

AuthRoutes.post('/create',createUser)



AuthRoutes.post('/login',login)
AuthRoutes.post('/change-password',changePassword)


module.exports={AuthRoutes}

// AuthRoutes.post('/forgot-password')

// AuthRoutes.post('/reset-password')

// AuthRoutes.post('/change-password')
// AuthRoutes.post('/update-password')


