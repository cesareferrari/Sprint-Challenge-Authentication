const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../user/user-model.js');

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  try {
    const newUser = await User.add(user);
    console.log("newUser", newUser);
    if (newUser) {
      res.status(201).json(newUser);
    } else {
      res.status(400).json({message: "Required credentials"});
    }
  } catch (err) {
    res.status(500).json({message: "Error creating the user"})
  }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
