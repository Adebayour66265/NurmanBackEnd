const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
      max: 64,
    },
    picture: {
      type: String,
      default: "/avater.png",
    },
    role: {
      type: [String],
      default: ["Subscriber"],
      enum: ["Subscriber", "Instructor", "Admin"],
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    // stripe_account_id: "",
    // stripe_seller: {},
    // stripeSession: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;