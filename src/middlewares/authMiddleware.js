// middlewares/authMiddleware.js
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // 用户已登录，继续执行
  }
  return res.redirect('/login.html');
};

export default isAuthenticated;
