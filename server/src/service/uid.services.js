const md5 = require("md5");

const generateUID = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  result += new Date();
  console.log(result);
  var uid = md5(result);
  console.log(uid);
  return uid;
};

module.exports = { generateUID };
