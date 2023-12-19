
const controller = require('../controllers/mypage.controller');
const express = require('express');
const router = express();

router.get('/', controller.getMyPage);

router.patch('/changename', controller.changeUserName);

router.patch('/changepassword', controller.changeUserPassword);

router.delete('/', controller.deleteUser);

module.exports = router;
