const User = require('../models/Users');

// const validation = (...args) => {
//   return args.every((element) => element);
// };

const myAccount = async (req, res) => {
  const user = await User.userFind(req.user.email);
  return res.status(200).json({ email: user.email, name: user.name });
};

module.exports = { myAccount };
