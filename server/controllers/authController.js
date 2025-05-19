const login = async (req, res) => {};
const logout = async (req, res) => {};
const registrater = async (req, res) => {
  const { email, password, name } = req.body;
  // console.log('🍣 ~ authController.js:5 ~ registrater ~ req.body:', req.body);

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  return res.status(201).json({ message: 'User registered' });
};

module.exports = { login, logout, registrater };
