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
router.get("/culture/library", controller.library);
router.get("/culture/class", controller.dayClass);

router.get("/kiosk", controller.kiosk);

router.post("/logout", controller.logout);

module.exports = router;
