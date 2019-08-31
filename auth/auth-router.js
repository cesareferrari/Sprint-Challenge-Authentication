const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const User = require('../user/user-model.js');

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const newUser = await User.add(user);

    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(400).json({message: "Required credentials"});
    }
  } catch (err) {
    res.status(500).json({message: "Error creating the user"})
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username)

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(401).json({message: "Invalid credentials"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({message: "Error retrieving the user"});
  }
});

function generateToken(user) {
  const payload = {
    subject: "user",
    username: user.username 
  }

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options);
}

module.exports = router;
