function getUrl(req, res, next) {
    if (req.session.accessToken) {
        return next();
    }
    req.session.url = req.url;
    console.log(req.session.url);
    next();
}

module.exports = getUrl;