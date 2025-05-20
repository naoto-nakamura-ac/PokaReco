const Session = require('../models/Sessions');

const authenticate = async (req, res, next) => {
  const token = req.cookies.session_token;
  if (!token) {
    return res.status(401).json({ message: 'ログインしていません' });
  }
  const session = await Session.findToken(token); // コントローラ介さずに直接モデルへアクセス

  if (!session || session.expires_at < new Date()) {
    return res.status(401).json({ message: '無効なセッション' });
  }
  req.user = { id: session.user_id, email: session.email };
  next();
};

module.exports = { authenticate };
