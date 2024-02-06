const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register user account
router.post("/register", async (req, res) => {
  try {
    //check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({ success: false, message: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ message: "User created success", data: null, success: true }); //data:null is not sending the password for frontend becz we hashed
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

//Login user account
router.post("/login", async (req, res) => {
  try {
    //check if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({ success: false, message: "User does not exists" });

      //check if password is correct
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.send({ success: false, message: "Invalid password" });
      }

      //Generate token
      const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
        expiresIn: "1h",
      });
      res.send({
        message: "User logged in successfully",
        data: data,
        success: true,
      });
    }
  } catch (error) {
    res.semd({ message: error.message, success: false });
  }
});

module.exports = router;

