const express = require('express');
const router = express();

router.get('/add-word', function(req, res) {
    res.render('addWord');
});



module.exports = router;