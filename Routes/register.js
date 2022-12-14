// register route
const router = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../Models/User");

router.post("/", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    return res.status(422).json({ message: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ message: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ message: "A senha é obrigatória!" });
  }
  if (!confirmPassword) {
    return res.status(422).json({ message: "A confirmação de senha é obrigatória!" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ message: "As senhas não correspondem a mesma!" });
  }

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res
      .status(400)
      .json({ message: "Esse email já esta em uso, tente novamente!" });
  }

  // creating password
  const salt = await bcrypt.genSalt(15);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try{

    await user.save();

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" })

  } catch(error) {
    console.log(error)
    return res.status(500).json({ message: "Ocorreu um erro no servidor, tente novamente mais tarde!"})
  }
});

module.exports = router;
