require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/', (req, res) => {
    res.send("Funcionando!")
})

app.listen(3000, () => console.log("Servidor rodando"))