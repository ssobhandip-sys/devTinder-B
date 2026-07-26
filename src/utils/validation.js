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

const validateEditProfileData = (req) => {
  try {
    const allowedEditFields = [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "about",
      "skills",
    ];
    const isAllowedEdit = Object.keys(req.body).every((field) =>
      allowedEditFields.includes(field),
    );
    return isAllowedEdit;
  } catch (err) {
    console.log("Error in profile edit validation ",err)
  }
};

const validateforgetPasswordData = (req) => {
  const allowedForgetPasswordFields = ["password"];

  const isAllowedForgetPassword = Object.keys(req.body).every((field) =>
    allowedForgetPasswordFields.includes(field),
  );
  console.log("isAllowedForgetPassword", isAllowedForgetPassword);
  return isAllowedForgetPassword;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
  validateforgetPasswordData,
};
