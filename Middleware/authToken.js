require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const secret = process.env.SECRET

const token = jwt.sign(
    {    
        id: User._id,

    },
    secret,
)

module.exports = token