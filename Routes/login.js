// register route
const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../Models/User");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if(!email) {
    return res.status(422).json({ message: "O email é obrigatório!" })
  }
  if(!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" })
  }

  const userExist = await User.findOne({ email: email })

  if(!userExist) {
    return res.status(404).json({ message: "Usuário não encontrado, email inválido!"})
  }

  // conferindo a senha
})

module.exports = router;