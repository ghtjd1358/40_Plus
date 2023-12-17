function clearUserInfo(req, res) {
    req.session.accessToken = null;
    res.locals.accessToken = null;
    res.locals.userid = null;
}

module.exports = clearUserInfo;