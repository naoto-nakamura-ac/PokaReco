const User = require('../models/Users');
const Children = require('../models/Children');

// const validation = (...args) => {
//   return args.every((element) => element);
// };

const myAccount = async (req, res) => {
  const user = await User.findUser(req.user.email);
  const children = await Children.findChildren(req.user.id);
  return res.status(200).json({ email: user.email, name: user.name, children });
};

module.exports = { myAccount };
