// register route
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token = require('../Middleware/authToken')

const User = require("../Models/User");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ message: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Usuário não encontrado, email inválido!" });
  }

  // conferindo a senha
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(403).json({ message: "Senha incorreta!" });
  }


  try {
    
    return res.status(200).json({ message: "Autenticação realizada com sucesso", token})

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        message: "Ocorreu um erro no servidor, tente novamente mais tarde!",
      });
  }

});

module.exports = router;
