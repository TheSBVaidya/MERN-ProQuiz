const userService = require("../services/userService");
const { apiError, apiSuccess } = require("../utils/apiResponse");

const userController = {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password)
        return res.status(400).json(apiError("Please Enter proper details"));

      try {
        const user = await userService.registerUser(name, email, password);
        res.status(201).json(apiSuccess(user));
      } catch (err) {
        if (err.code === "EMAIL_EXISTS") {
          return res.status(400).json(apiError("Email already in use"));
        }
        throw err;
      }
    } catch (err) {
      console.error("register user error: ", err);
      const message = err.sqlMessage || "Server error during registration";
      return res.status(500).json(apiError(message));
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json(apiError("Please Enter proper details"));

      const user = await userService.loginUser(email, password);
      if (!user) return res.status(401).json(apiError("Invalid credentials"));
      return res.status(200).json(apiSuccess(user));
    } catch (err) {
      console.error("login error:", err);
      return res.status(500).json(apiError("Server error during login"));
    }
  },
};

module.exports = userController;
