const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res
        .status(403)
        .json({ msg: "You are not allowed to access this route!" });
    }
  } else {
    res.status(403).json({ msg: "You are not allowed to access this route!" });
  }
};

module.exports = checkLogin;
