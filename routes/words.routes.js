const express = require('express');
const router = express();
const getUrlMiddleware= require('../middlewares/getUrl');
const controller = require('../controllers/word.controller');

router.get('/word', getUrlMiddleware, controller.getAddWord);

router.post('/word/addword', controller.addWord);

router.get('/word/keyboard', getUrlMiddleware, controller.getKeyboard);



module.exports = router;