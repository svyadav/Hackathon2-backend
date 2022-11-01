const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRound = 10;
const secretkey = "JFNFURKDNDKDP";

let hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(saltRound);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

let hashCompare = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

let createToken = async (email, role) => {
  let token = await jwt.sign({ email, role }, secretkey, { expiresIn: "1m" });
  return token;
};

let jwtDecode = async (token) => {
  let data = await jwt.decode(token);
  return data;
};

let validate = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    let data = await jwtDecode(token);
    let currentTime = Math.round(new Date() / 1000);
    if (currentTime < data.exp) next();
    else {
      res.send({
        statusCode: 401,
        message: "Token expired",
      });
    }
  } else {
    res.send({
      statusCode: 400,
      message: "Invalid token",
    });
  }
};

module.exports = { hashPassword, hashCompare, createToken, jwtDecode,validate };
