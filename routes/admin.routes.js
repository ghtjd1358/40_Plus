const express = require('express');
const router = express();

const controller = require('../controllers/admin.controller');


router.get('/confirmword', controller.getConfirmWord);

router.delete('/confirmword', controller.deleteWord);

router.post('/confirmword', controller.approveWord);


module.exports = router;