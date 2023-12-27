const express = require('express');
const router = express();

router.get('/401', function(req, res) {
    res.status(401).render('component/401');
});

router.get('/404', function(req, res) {
    res.status(404).render('component/404');
});

router.get('/403', function(req, res) {
    res.status(403).render('component/403');
});

router.get('/500', function(req, res) {
    res.status(500).render('component/500');
});

module.exports = router;