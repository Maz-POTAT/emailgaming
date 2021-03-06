const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { check, body } = require("express-validator");

router.get("/login", authController.getLogin);
router.get("/logout", authController.getLogout);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password", "Password has to be valid.")
      .isLength({ min: 2 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

router.post(
  "/send_password",
  authController.postSendPassword
);

router.post(
  "/reset",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail()
  ],
  authController.postReset
);

module.exports = router;
