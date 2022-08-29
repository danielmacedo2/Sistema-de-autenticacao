require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const app = express();

// json configuration
app.use(express.json());

// importing user model
const User = require("./Models/User");

// open route
app.get("/", (req, res) => {
  res.send("Funcionando!");
});

// register
app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) {
    res.status(422).json({ message: "O nome é obrigatório!" });
  }
  if (!email) {
    res.status(422).json({ message: "O email é obrigatório!" });
  }
  if (!password) {
    res.status(422).json({ message: "A senha é obrigatória!" });
  }
  if (!confirmPassword) {
    res.status(422).json({ message: "A confirmação de senha é obrigatória!" });
  }
  if (password !== confirmPassword) {
    res.status(422).json({ message: "As senhas não correspondem a mesma!" });
  }

  const userExist = await User.findOne({ email: email });

  // creating password
  const salt = await bcrypt.genSalt(15);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: passwordHash
  })
});

// Credentials
const dbUser = process.env.USER;
const dbPassword = process.env.PASSWORD;
const port = process.env.PORT;

// Connection with database
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.tibo4ql.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Banco de dados conectado!");
    app.listen(port, () => console.log("Servidor rodando na porta 4000"));
  });
