let express=require("express")
const { sendOtp, createUser, login, changePassword, updateProfile, userData, forgotPassword, resetPassword } = require("../../controllers/web/authController")
const { fileUpload } = require("../../middleware/fileUpload")

let upload=fileUpload("uploads/users")

let AuthRoutes=express.Router()


AuthRoutes.post('/send-otp',sendOtp)

AuthRoutes.post('/create',createUser)



AuthRoutes.post('/login',login)
AuthRoutes.post('/change-password',changePassword)
AuthRoutes.post('/user-details',userData)
AuthRoutes.post('/update-profile',upload.single('userPhoto'), updateProfile)


AuthRoutes.post('/forgot-password',forgotPassword)

AuthRoutes.post('/reset-password',resetPassword)



module.exports={AuthRoutes}

// AuthRoutes.post('/forgot-password')

// AuthRoutes.post('/reset-password')

// AuthRoutes.post('/change-password')
// AuthRoutes.post('/update-password')


