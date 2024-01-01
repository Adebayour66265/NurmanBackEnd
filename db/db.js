const mongoose = require("mongoose");
require("dotenv").config();



mongoose.set("strictQuery", true);
const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then((_) => console.log("MongoDB Connected"));
};

module.exports = connectDB;