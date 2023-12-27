function getUrl(req, res, next) {
    res.locals.url = req.url();
    next();
}

module.exports = getUrl;