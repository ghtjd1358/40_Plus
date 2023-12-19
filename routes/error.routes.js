const express = require('express');
const router = express();

router.get('/401', function(req, res) {
    res.status(401).render('401');
});

router.get('/404', function(req, res) {
    res.status(404).render('404');
});

module.exports = router;