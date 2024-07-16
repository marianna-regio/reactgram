const User = require("../models/User");

const bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign(id, jwtSecret, {
    expiresIn: "7d",
  });
};

// Register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body

  //check if user already registered
  const user = await User.findOne({email})

  if(user) {
    res.status(422).json({errors: ["Por favor utilize outro e-mail"]})
    return
  }

  // Generate password hash

  const salt = await bcript.genSalt()
  console.log('salt', salt)
  const passwordHash = await bcript.hash(password, salt)
  console.log('passwordHash', passwordHash)

  // Create user

  const newUser = await User.create({
    name,
    email,
    password: passwordHash
  })

  if (!newUser) {
    res.status(422).json({errors: ["Houve um erro, tente novamente mais tarde"]})
  }

  res.status(201).json({
    _id: newUser._id,  //id vem do mongoose
    token: generateToken(newUser._id)
  })

};

module.exports = {
  register,
};
