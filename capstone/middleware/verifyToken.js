const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const verifyToken = (req, res, next) => {
  // console.log(req.headers['authorization']);
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(500).send({
        message: "token verify in  middleware errorr",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(500).send({
      message: "token verify Error",
    });
  }
};

const verifyEditable = (tokenheader) => {
  if (!tokenheader) {
    return;
  }
  const decode = jwt.verify(tokenheader, process.env.SECRET_KEY);
  return decode.userId;
};


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });


// const upload = multer({
//   storage: storage,
// });


module.exports = { verifyToken, verifyEditable};
