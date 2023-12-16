const express = require('express');

const controller = require('../controllers/auth.controller');

const router = express();

router.get('/', function(req,res) {
    res.render('index');
})

router.get('/signup', controller.getSignup);

router.post('/signup', controller.signup);

router.get('/login', controller.getLogin);

router.post('/login', controller.login);

router.post('/isvalid', controller.existsAlready);
module.exports = router;