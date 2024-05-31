const express = require("express");
const router = express.Router()

//Controller

const { register } = require("../controllers/UserController");

//Router
router.post("/register", register)

module.exports = router;