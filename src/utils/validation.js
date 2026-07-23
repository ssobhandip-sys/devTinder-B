const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is Invalid!!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is Invalid!!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

module.exports = { validateSignupData };
