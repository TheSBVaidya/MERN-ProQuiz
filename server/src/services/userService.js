const UserModel = require("../models/userModel");

const userService = {
  async registerUser(name, email, password) {
    const exist = await UserModel.findUserByEmail(email);

    if (exist) {
      const err = new Error("Email already in use");
      err.code = "EMAIL_EXISTS";
      throw err;
    }

    const user = await UserModel.registerUser(name, email, password);
    // console.log("Service: ", user);
    return user;
  },

  async loginUser(email, password) {
    return await UserModel.loginUser(email, password);
  },
};

module.exports = userService;
