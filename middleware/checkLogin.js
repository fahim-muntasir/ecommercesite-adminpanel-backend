const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.userId) {
        req.user = decoded;
        next();
      } else {
        res
          .status(403)
          .json({ msg: "You are not allowed to access this route!" });
      }
    } catch (err) {
      res.status(401).json({ msg: "Token has expired. Please log in again." });
    }
  } else {
    res.status(403).json({ msg: "You are not allowed to access this route!" });
  }
};

module.exports = checkLogin;
