// register route
const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../Models/User");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  
})

module.exports = router;