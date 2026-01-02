let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  userName: {
    type: String,
    match: [
      /^[A-Za-z\s]+$/,
      "User Name should contain only alphabets (A-Z, a-z)",
    ],
  },
  userGender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  userPhoto: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
  },
  userEmail: {
    type: String,
    required: [true, "User Email is required"],
    unique: true,
  },
  userPhone: {
    type: String,
    match: [/^\d{10}$/, "User Phone should be a valid 10-digit number"],
  },
  userPassword: {
    type: String,
    required: [true, "User Password is required"],
  },
  userAddress: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

  deletedAt: {
    type: Date,
    default: null,
  },
});
let userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
