const checkAccessMiddleware = require("../middlewares/checkAccessToken");
const getUrlMiddleware = require("../middlewares/getUrl");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express();

router.get("/", getUrlMiddleware, controller.getIndex);

router.get("/signup", controller.getSignup);

router.post("/signup", controller.signup);

router.get("/login", controller.getLogin);

router.post("/login", controller.login);

router.post("/isvalid", controller.existsAlready);

router.get("/culture", getUrlMiddleware, controller.culture);
router.get("/culture/library", getUrlMiddleware, controller.library);
router.get("/culture/class", getUrlMiddleware, controller.dayClass);
router.get("/culture/festival", getUrlMiddleware, controller.festival);

router.get("/computer", getUrlMiddleware, controller.computer);
router.get("/sub_kiosk", getUrlMiddleware, controller.sub_kiosk);

router.get("/kiosk", getUrlMiddleware, controller.kiosk);
router.get("/kiosk_word", getUrlMiddleware, controller.kiosk_word);



router.post("/logout", controller.logout);

module.exports = router;
