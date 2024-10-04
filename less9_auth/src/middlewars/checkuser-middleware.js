const checkUser = (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies && req.cookies.user) {
    res.locals.user = req.cookies.user;
  }
  next();
};
export default checkUser;
