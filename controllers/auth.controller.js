const User = require('../models/user.model');
const { creaPass } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ error: true, contenido: 'Usuario ya registrado' });
    }
    const passwordCrypt = creaPass(req.body.password);
    const result = await User.create({
      email: req.body.email,
      password: passwordCrypt,
      username: req.body.username,
      name: req.body.name,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      
    });
    res.json({ error: false, contenido: result });
  } catch (error) {
    next(error)
  }
};

const login = async (req, res) => {
  res.json({
    token: jwt.sign({ user: req.user._id, role: req.user.role }, 'secreto', { expiresIn: '1d' }),
  });
};

const verify = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signup,
  login,
  verify
};
