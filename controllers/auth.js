const jwt = require("jsonwebtoken");
const parser = require("ua-parser-js");

const User = require("../models/user");
const { hashPassword, comparePassword } = require("../util/auth");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body, email, password);
    // validation
    if (!name || !email || !password) {
      res.status(400);
      return res.status(400).send("Please fill in all the require fields.");
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

    // Get UserAgent
    const ua = parser(req.headers["user-agent"]);
    const userAgent = [ua.ua];

    // register
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      userAgent,
    }).save();
    console.log(user);

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error try again");
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body, email, password);
    // validation
    if (!email || !password) {
      res.status(400);
      return res.status(400).send("Please fill in all the require fields.");
    }
    if (!password || password.lenght < 6) {
      return res.status(400).send("password should be more than 6 character");
    }

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");

    const match = await comparePassword(password, user.password);

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // return user and token to client , exclude hashed password
    user.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true
    });

    // send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error try again");
  }
};

const forgotPassword = (req, res) => {
  res.send("route :     " + req.originalUrl);
};

module.exports = {
  register,
  login,
  forgotPassword,
};
