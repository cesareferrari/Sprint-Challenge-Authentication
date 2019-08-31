const router = require('express').Router();
const User = require('../user/user-model.js');

router.post('/register', async (req, res) => {
  const user = req.body;

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
