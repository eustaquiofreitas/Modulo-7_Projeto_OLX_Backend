const express = require("express");
const router = express.Router();

const Auth = require("./middlewares/Auth");
const AuthValidator = require("./validators/AuthValidator");
const UserValidator = require("./validators/UserValidator");

const AuthController = require("./controller/AuthController");
const UserController = require("./controller/UserController");
const AdminController = require("./controller/AdminController");

router.get("/ping", (request, response) => {
  response.json({ pong: true });
});

router.get("/states", UserController.getStates);

router.post("/user/signin", AuthValidator.signin, AuthController.signin);
router.post("/user/signup", AuthValidator.signup, AuthController.signup);

router.get("/user/me", Auth.private, UserController.info);
router.put(
  "/user/me",
  UserValidator.editAction,
  Auth.private,
  UserController.editAction
);

router.get("/categories", AdminController.getCategories);

router.get("/admin/add", Auth.private, AdminController.addAction);
router.get("/admin/list", AdminController.getList);
router.get("/admin/item", AdminController.getItem);
router.post("/admin/:id", Auth.private, AdminController.editAction);

module.exports = router;
