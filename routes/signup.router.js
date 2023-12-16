const express = require('express');

const controller = require('../controllers/auth.controller');

const router = express();

router.get('/', controller.getIndex);

router.get('/signup', controller.getSignup);

router.post('/signup', controller.signup);

router.get('/login', controller.getLogin);

router.post('/login', controller.login);

router.post('/isvalid', controller.existsAlready);

router.post('/logout', controller.logout);
module.exports = router;