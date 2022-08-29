require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// json configuration
app.use(express.json());

// importing user model
const User = require("./Models/User");

// open route
app.get("/", (req, res) => {
  res.send("Funcionando!");
});

// API Routes
const registerRoute = require('./Routes/register')
const loginRoute = require("./Routes/login")

app.use('/register', registerRoute)
app.use('/login', loginRoute)

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
