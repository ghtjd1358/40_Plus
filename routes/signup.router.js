const checkAccessMiddleware = require("../middlewares/checkAccessToken");
const controller = require("../controllers/auth.controller");
const express = require("express");

const router = express();

router.get("/", controller.getIndex);

router.get("/signup", controller.getSignup);

router.post("/signup", controller.signup);

router.get("/login", controller.getLogin);

router.post("/login", controller.login);

router.post("/isvalid", controller.existsAlready);

router.get("/culture", controller.culture);

router.get("/library", controller.library);

router.get("/community", controller.community);

router.post("/logout", controller.logout);

router.get("/mypage", checkAccessMiddleware, controller.getMyPage);

router.patch(
  "/mypage/changename",
  checkAccessMiddleware,
  controller.changeUserName
);

router.patch(
  "/mypage/changepassword",
  checkAccessMiddleware,
  controller.changeUserPassword
);

router.delete("/mypage", checkAccessMiddleware, controller.deleteUser);

module.exports = router;
