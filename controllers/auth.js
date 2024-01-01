const User = require("../models/user");
const { hashPassword, comparePassword } = require("../util/auth");



const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
     // validation
     if (!name || !email || !password) {
      res.status(400)
      throw new Error("Please fill in all the require fields.");
  }
    if (!password || password.lenght < 6) {
      return res.status(400).send("password should be more than 6 character");
    }
    const UserExist = await User.findOne({ email }).exec();
    if (UserExist) {
      return res.status(400).send("User exist, Log in instead");
    }

    // hashed password
    const hashedPassword = await hashPassword(password);

    // register
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    console.log(user);

  
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error try again");
  }
};



const login = (req, res) => {
  res.send("route :     " + req.originalUrl);
};

const forgotPassword = (req, res) => {
  res.send("route :     " + req.originalUrl);
};

module.exports = {
  register,
  login,
  forgotPassword,
};
