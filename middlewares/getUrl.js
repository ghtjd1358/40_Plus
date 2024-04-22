function getUrl(req, res, next) {
    if (req.session.accessToken) {
        return next();
    }
    req.session.url = req.url;
    next();
}
module.exports = getUrl;