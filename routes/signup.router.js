const express = require('express');

const checkAccessMiddleware = require('../middlewares/checkAccessToken');
const controller = require('../controllers/auth.controller');

const router = express();

router.get('/', controller.getIndex);

router.get('/signup', controller.getSignup);

router.post('/signup', controller.signup);

router.get('/login', controller.getLogin);

router.post('/login', controller.login);

router.post('/isvalid', controller.existsAlready);

router.post('/logout', controller.logout);

router.get('/mypage', checkAccessMiddleware, controller.getMyPage);

router.patch('/mypage/changename', checkAccessMiddleware, controller.changeUserName)

router.get('/401', function(req, res) {
    res.render('401')
})
module.exports = router;